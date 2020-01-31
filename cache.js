let caches = {};

module.exports = () => {
    return {
        getCache: (guild) => {
            let guildId = guild.id;
            if (!caches[guildId]) {
                caches[guildId] = {};
            }
            let cache = caches[guildId];
            return {
                setItem: (name, item) => cache[name] = item,
                getItem: (name) => cache[name],
                deleteItem: (name) => delete cache[name],
                clear: () => {
                    caches[guildId] = {};
                    cache = caches[guildId];
                }
            }
        },
        logIt: () => {
            console.log(caches.length);
            console.log(caches);
        }
    }
};
