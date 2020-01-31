let caches = {};

module.exports = () => {
    return {
        getCache: (guild) => {
            if (!caches[guild.id]) {
                caches[guild.id] = {};
            }
            let cache = caches[guild.id];
            return {
                setItem: (name, item) => cache[name] = item,
                getItem: (name) => cache[name],
                deleteItem: (name) => delete cache[name],
            }
        },
        logIt: () => {
            console.log(caches.length);
            console.log(caches);
        }
    }
};
