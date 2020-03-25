

exports.usage = (client) => {
    return `Don't use this command. Bugger off.`;
};

exports.run = (client, message, args) => {
    const currentGuild = message.guild;
    const channels = currentGuild.channels.cache.array();
    const serverChangesChannelName = client.config.serverChangesChannel;
    const foundChannels = channels
        .filter((channel) => channel.name === serverChangesChannelName)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    let deletedCount = 0;
    for (let i = 0, len = foundChannels.length; i < len - 1; i++) {
        foundChannels[i].delete();
        deletedCount++;
    }
    client.cache.getCache(currentGuild).clear();
    message.channel.send(`I deleted ${deletedCount} channels and the cache has been cleared.`);
};
