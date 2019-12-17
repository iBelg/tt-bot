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
    const toVoiceChannel = authorMember.voiceChannel;
    if (mentionedUsers && mentionedUsers.size > 0) {
        mentionedUsers.forEach((user) => {
            const member = message.guild.member(user);
            if (member) {
                if (!member.voiceChannel) {
                    message.channel.send(`${member.user.username} is not connected to voice.`)
                } else if (member.voiceChannel !== toVoiceChannel) {
                    member.setVoiceChannel(toVoiceChannel);
                }
            }
        });
    }
};
