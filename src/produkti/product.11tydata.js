module.exports = {
    eleventyComputed: {
        relatedProducts: (data) => {
            const vehicles = data.transport || [];
            const currentVehicle = data.vehicle;

            if (!vehicles.length || !currentVehicle) {
                return [];
            }

            const variants = vehicles.filter((item) => item.meta_title !== currentVehicle.meta_title);

            for (let i = variants.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [variants[i], variants[j]] = [variants[j], variants[i]];
            }

            return variants.slice(0, 4);
        }
    }
};

