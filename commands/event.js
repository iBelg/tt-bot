const Discord = require('discord.js');

exports.usage = (client) => {
    return `${client.config.prefix}event <description>`;
};

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username} created an event!`)
      .setColor(0xFF0000)
      .setDescription(args.join(' '));
    message.channel.send('@everyone A new event has been created.');
    message.channel.send(embed)
      .then(async (message) => {
        await message.react('✅');
        await message.react('❎');
      });
};
