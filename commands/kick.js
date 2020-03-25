exports.aliases = undefined;

exports.usage = (client) => {
    return `
    ${client.config.prefix}kick <user mention>
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
                member.kick("Admin abuse");
            }
        });
    }
};
