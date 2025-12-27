module.exports = () => {
	const data = require('./servicesContent.json');

	function normalizePath(path) {
		if (!path) return path;
		if (typeof path !== 'string') return path;
		if (/^https?:\/\//i.test(path)) return path;
		const trimmed = path.replace(/^\/+/, '');
		return `/${trimmed}`;
	}

	function transliterateCyrillic(text) {
		const cyrillicMap = {
			'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
			'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
			'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
			'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a',
			'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
		};
		
		return text.split('').map(char => {
			const lower = char.toLowerCase();
			return cyrillicMap[lower] || char;
		}).join('');
	}

	function baseSlug(text) {
		return String(text || '')
			.trim()
			.toLowerCase()
			// transliterate Cyrillic to Latin
			.replace(/[\u0400-\u04FF]/g, (match) => {
				const cyrillicMap = {
					'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
					'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
					'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
					'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a',
					'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
				};
				return cyrillicMap[match] || match;
			})
			// replace whitespace with hyphens
			.replace(/\s+/g, '-')
			// keep only latin letters, digits, and hyphens
			.replace(/[^a-z0-9-]+/g, '')
			// collapse multiple hyphens
			.replace(/-+/g, '-')
			.replace(/(^-+|-+$)/g, '');
	}

	const usedSlugs = new Set();
	function ensureUniqueSlug(text) {
		let slug = baseSlug(text);
		if (!slug) slug = 'usluga';
		let unique = slug;
		let i = 2;
		while (usedSlugs.has(unique)) {
			unique = `${slug}-${i++}`;
		}
		usedSlugs.add(unique);
		return unique;
	}

	const services = [];
	if (Array.isArray(data)) {
		for (const svc of data) {
			if (!svc) continue;

			const normalizedIcon = normalizePath(svc.serviceIcon);

			const rawImages = [];
			if (svc.serviceImage) rawImages.push(svc.serviceImage);
			if (Array.isArray(svc.images)) rawImages.push(...svc.images);

			const normalizedImages = rawImages.map(normalizePath).filter(Boolean);
			const primaryImage = normalizedImages[0] || '';

			const baseSlugValue = svc.slug ? baseSlug(svc.slug) : baseSlug(svc.title || svc.name);
			const uniqueSlug = ensureUniqueSlug(baseSlugValue || svc.title || svc.name);

			// Create truncated version for service cards (homepage only)
			const fullDescription = svc.shortDescription || svc.description || '';
			const cardDescription = fullDescription.length > 100 
				? fullDescription.substring(0, 100) + '...' 
				: fullDescription;

			services.push({
				name: svc.title || svc.name,
				description: fullDescription,
				cardDescription: cardDescription,
				longDescription: svc.longDescription || '',
				metaTitle: svc.metaTitle || '',
				metaDescription: svc.metaDescription || '',
				serviceIcon: normalizedIcon || '',
				serviceCardColor: svc.serviceCardColor || '#FFFFFF',
				image: normalizePath(svc.serviceImage) || primaryImage,
				images: normalizedImages.length > 0 ? normalizedImages : (normalizePath(svc.serviceImage) ? [normalizePath(svc.serviceImage)] : []),
				price: svc.price || null,
				time: svc.time || '',
				howItWorks: svc.howItWorks || [],
				benefits: svc.benefits || [],
				keyPoints: svc.keyPoints || [],
				faq: svc.faq || [],
				slug: uniqueSlug
			});
		}
	}
	return services;
};
