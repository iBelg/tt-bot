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

      
    }
  });

  client.login(process.env.TOKEN);
};

