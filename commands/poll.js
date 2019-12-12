const Discord = require('discord.js');

const possibleReactions = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];

exports.usage = (client) => {
    return `${client.config.prefix}poll <description>|<option1>|<option2>|...`;
};

exports.run = (client, message, args) => {
    const options = args.join(' ').split('|');
    const description = options.shift();

    if (!options) return;

    if (options.length > 10) {
        message.channel.send('A maximum of ten options is allowed.');
        return;
    } else if (options.length <= 1) {
        message.channel.send('A minimum of two options is required.');
        return;
    }

    let optionsString = '';
    options.forEach((option, index) => {
        optionsString += `${possibleReactions[index]} => ${option}\n`;
    });

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    const embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} created a poll!`)
        .setColor(0xC30EA9)
        .setDescription(`${description}\n
        Options: \n
        ${optionsString}
      `);
    message.channel.send(embed)
        .then(async (message) => {
            await asyncForEach(options, async (option, index) => {
                await message.react(possibleReactions[index]);
            });
        });
};
