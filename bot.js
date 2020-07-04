const events = require('events');

module.exports = (() => {
    const Discord = require('discord.js');
    const Enmap = require('enmap');
    const fs = require('fs');

    const config = require('./config.js');
    const cache = require('./cache.js');
    const client = new Discord.Client();
    client.commands = new Enmap();
    client.rawEvents = new Enmap();
    client.eventEmitter = new events.EventEmitter();
    client.config = config();
    client.cache = cache();
    console.log(config());

    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
            if (!file.endsWith('.js')) return;
            const event = require(`./events/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
        });
    });

    fs.readdir('./raw-events/', (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
            if (!file.endsWith('.js')) return;
            const event = require(`./raw-events/${file}`);
            const eventName = file.split('.')[0];
            client.rawEvents.set(eventName, event);
        });
    });

    fs.readdir('./commands/', (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith('.js')) return;
            const command = require(`./commands/${file}`);
            const commandName = file.split('.')[0];
            client.commands.set(commandName, command);
            if (command.hasOwnProperty('setup')) {
                command.setup(client);
            }
            if (command.hasOwnProperty('aliases') && command.aliases) {
                const listAliases = command.aliases;
                for (const alias of listAliases) {
                    if (!client.commands.has(alias)) {
                        client.commands.set(alias, command);
                    }
                }
            }
        });
    });

    console.log('Attempting login with token:', client.config.token);
    client.login(client.config.token).then((result) => {
        console.log('Bot has logged in.');
    });
    return client;
})();

