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
    },
    findUserInGuild: (guildId, userId, client) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
            const member = guild.members.cache.get(userId);
            if (member) {
                return member;
            }
            throw new Error(`User with id "${userId}" does not exist (in guild with id "${guildId}")`);
        } else {
            throw new Error(`Guild with id "${guildId}" does not exist`);
        }
    }
};
