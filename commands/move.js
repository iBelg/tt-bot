exports.aliases = ['kidnap', 'blackhole'];

exports.usage = (client) => {
    return `
    ${client.config.prefix}move <user mention>
    `;
};

exports.run = (client, message) => {
    const mentionedUsers = message.mentions.users;
    const authorUser = message.author;
    const authorMember = message.guild.member(authorUser);
    const toVoiceChannel = authorMember.voice.channel;
    if (mentionedUsers && mentionedUsers.size > 0) {
        mentionedUsers.forEach((user) => {
            const member = message.guild.member(user);
            if (member) {
                if (!member.voice.channel) {
                    message.channel.send(`${member.user.username} is not connected to voice.`)
                } else if (member.voice.channel !== toVoiceChannel) {
                    member.voice.setChannel(toVoiceChannel);
                }
            }
        });
    }
};
