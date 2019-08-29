module.exports = () => {
  const Discord = require('discord.js');
  const Enmap = require('enmap');
  const fs = require('fs');
  
  const client = new Discord.Client();

  fs.readdir('./events/', (err, files) => {
    
  });
  
  client.login(process.env.TOKEN);
};

