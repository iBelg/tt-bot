const events = require('events');

// data: {user_id: snowflake, channel_id: snowflake, message_id: snowflake, guild_id?: snowflake, member?: object, emoji: object}
exports.process = (client, data) => {
    const {user_id: userId, channel_id: channelId, guild_id: guildId, message_id: messageId, member, emoji} = data;
    if (member == null) {
        return;
    }

    const message$ = findMessage(client, channelId, messageId);
    message$.then((message) => {
        client.eventEmitter.emit('messageReactionAdd', {message: message, member: member, emoji: emoji});
    })
    .catch(console.error);
};


function findMessage(client, channelId, messageId) {
    const channel = client.channels.get(channelId);
    return channel.fetchMessage(messageId);
}
