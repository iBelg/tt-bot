module.exports = () => {
    const Discord = require('discord.js');
    const Enmap = require('enmap');
    const fs = require('fs');

    const config = require('./config.js');
    const client = new Discord.Client();
    client.commands = new Enmap();
    client.config = config();
    console.log(config());

    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
            const event = require(`./events/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
        });
    });

    fs.readdir('./commands/', (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith('.js')) return;
            const props = require(`./commands/${file}`);
            const commandName = file.split('.')[0];
            console.log(`Attempting to load command: ${commandName}`);
            client.commands.set(commandName, props);
        });
    })

    console.log('Attempting login with token:', client.config.token);
    client.login(client.config.token).then((result) => {
        console.log('Bot has logged in.');
    });
};

