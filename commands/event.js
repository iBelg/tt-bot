const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username} created an event!`)
      .setColor(0xFF0000)
      .setDescription(...args);
    message.channel.send('@everyone A new event has been created.');
    message.channel.send(embed)
      .then((message) => {
        message.react('✅');
        message.react('❎');
      });
};