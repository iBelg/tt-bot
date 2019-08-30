const { RichEmbed } = require('discord.js');

exports.usage = (client) => {
    return `
    ${client.config.prefix}help
    ${client.config.prefix}help <command>
    `;
};

exports.run = (client, message, args) => {
    let embed = new RichEmbed();
    if (args.length >= 1) {
        let commandName = args[0];
        let foundCommand = client.commands.get(commandName);

        if (!foundCommand) {
            message.channel.send(`No \`${commandName}\` found.`);
            return;
        }

       embed.setTitle(`Usage of ${commandName}`)
           .setDescription(foundCommand.hasOwnProperty('usage') ? foundCommand.usage(client) : 'No usage defined!');
    } else {
        embed.setTitle(`Commands`)
            .setColor('#2eaf28')
            .setDescription(client.commands.keyArray().reduce((accumulator, currentValue) => `${accumulator}\n${client.config.prefix}${currentValue}`, ''));
    }
    message.channel.send(embed);
};
