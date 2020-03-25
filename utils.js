const random = require('random');

module.exports = {
    randomNumber: (minNumber, maxNumber) => {
        return random.int(minNumber, maxNumber);
    },
    camelToSnake: (str) => {
        return str ? str.replace(/[\w]([A-Z])/g, (match) => {
            return match[0] + "_" + match[1];
        }).toUpperCase() : undefined;
    },
    snakeToCamel: (str) => {
        return str ? str.toLowerCase().replace(/(_\w)/g, (match) => {
            return match[1].toUpperCase();
        }) : undefined;
    },
    isMyMessage: (client, message) => {
        return client.user.id === message.author.id;
    },
    informationIcon: () => {
        return 'ℹ️';
    },
    getAllReactionsFromMessageByMe: (message) => {
        const reactions = message.reactions.cache.array();
        return reactions.filter((reaction) => reaction.me);
    },
    getServerChangesChannel: (guild, client) => {
        const cache = client.cache.getCache(guild);
        const channels = guild.channels.cache.array();
        const serverChangesChannelName = client.config.serverChangesChannel;
        if (!cache.getItem('serverChangesChannel')) {
            const serverChangesChannel = channels.find((channel) => channel.name === serverChangesChannelName);
            if (serverChangesChannel) {
                cache.setItem('serverChangesChannel', serverChangesChannel);
            }
        }
        return cache.getItem('serverChangesChannel');
    }
};
