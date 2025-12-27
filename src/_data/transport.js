module.exports = () => {
	const data = require('./transportContent.json');

	function normalizePath(path) {
		if (!path) return path;
		if (typeof path !== 'string') return path;
		if (/^https?:\/\//i.test(path)) return path;
		const trimmed = path.replace(/^\/+/, '');
		return `/${trimmed}`;
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
		if (!slug) slug = 'vehicle';
		let unique = slug;
		let i = 2;
		while (usedSlugs.has(unique)) {
			unique = `${slug}-${i++}`;
		}
		usedSlugs.add(unique);
		return unique;
	}

	const transport = [];
	if (Array.isArray(data)) {
		for (const vehicle of data) {
			if (!vehicle) continue;

			const rawImages = [];
			if (Array.isArray(vehicle.images)) rawImages.push(...vehicle.images);
			if (vehicle.image) rawImages.push(vehicle.image);

			const normalizedImages = rawImages.map(normalizePath).filter(Boolean);
			const primaryImage = normalizedImages[0] || '';

			const baseSlugValue = vehicle.slug ? baseSlug(vehicle.slug) : baseSlug(vehicle.title || vehicle.name || vehicle.meta_title);
			const uniqueSlug = ensureUniqueSlug(baseSlugValue || vehicle.title || vehicle.name || vehicle.meta_title);

			transport.push({
				name: vehicle.title || vehicle.name,
				title: vehicle.title || vehicle.name,
				description: vehicle.shortDescription || vehicle.description || '',
				shortDescription: vehicle.shortDescription || vehicle.short_description || '',
				longDescription: vehicle.longDescription || vehicle.long_description || '',
				meta_title: vehicle.meta_title || uniqueSlug,
				serviceCardColor: vehicle.serviceCardColor || '#FFFFFF',
				image: primaryImage,
				images: normalizedImages.length > 0 ? normalizedImages : (primaryImage ? [primaryImage] : []),
				temperature_range: vehicle.temperature_range || '',
				capacity: vehicle.capacity || '',
				payload: vehicle.payload || '',
				features: vehicle.features || [],
				monitoring: vehicle.monitoring || [],
				ideal_loads: vehicle.ideal_loads || [],
				availability: vehicle.availability || '',
				transportCardGraphic: vehicle['transport-card-graphic'] || vehicle.transportCardGraphic || '',
				slug: uniqueSlug
			});
		}
	}
	return transport;
};

