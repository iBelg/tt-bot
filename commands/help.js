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
        
        if (commandName === 'banaan') {
            message.channel.send(`Ulle ma is een \`${commandName}\`.`);
            return;
        }
        else if (!foundCommand) {
            message.channel.send(`No \`${commandName}\` command found.`);
            return;
        }

       embed.setTitle(`Usage of ${commandName}`)
           .setDescription(foundCommand.hasOwnProperty('usage') ? foundCommand.usage(client) : 'No usage defined!');
        if (foundCommand.aliases) {
            embed.addField('Aliases', foundCommand.aliases.toString());
        }
    } else {
        const allCommands = client.commands.keyArray().reduce((accumulator, currentValue) => `${accumulator}\n${client.config.prefix}${currentValue}`, '');
        embed.setTitle(`Commands`)
            .setColor('#2eaf28')
            .setDescription(`Use ${client.config.prefix}help <command> to get more info about that command usage.\n\n${allCommands}`);
    }
    message.channel.send(embed);
};
