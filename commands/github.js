

exports.usage = (client) => {
    return `${client.config.prefix}github`;
};

exports.run = (client, message, args) => {
    message.channel.send(`Look through my internals over here: ${client.config.githubUrl}`);
};
