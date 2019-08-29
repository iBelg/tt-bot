module.exports = () => {
  const Discord = require('discord.js');
  const client = new Discord.Client();

  client.on('ready', () => {
    console.log('I am ready');
  });

  client.on('message', (message) => {
    if (message.content.indexOf(process.env.PREFIX) !== 0) return;

    if (message.content.startsWith(`${process.env.PREFIX}event`)) {   
      let splitted = message.content.split(' ');
      delete splitted[0];

      const embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} created an event!`)
        .setColor(0xFF0000)
        .setDescription(splitted.join(' '));
      message.channel.send('@everyone A new event has been created.');
      message.channel.send(embed)
        .then((message) => {
          message.react('✅');
          message.react('❎');
        });
    }
  });

  client.login(process.env.TOKEN);
};

