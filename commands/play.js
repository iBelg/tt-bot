const fs = require('fs');
const Enmap = require('enmap');

let soundMappings;
let queue = [];
let processingQueue = false;

exports.setup = (client) => {
    fs.readdir('./sounds/', (err, files) => {
        if (err) return console.error(err);
        if (files.length > 0) {
            soundMappings = new Enmap();
        }
        files.forEach(file => {
            const soundName = file.split('.')[0];
            const path = `./sounds/${file}`;
            soundMappings.set(soundName, path);
        });
    });
};

exports.usage = (client) => {
    return `
    Play a sound in your current voice channel.
    ${client.config.prefix}play <sound name> - play this sound (or add to queue)
    ${client.config.prefix}play list - lists all sound names
    ${client.config.prefix}play stop - stop/skips the currently playing sound
    ${client.config.prefix}play terminate - stop the current and all queued sounds
    `;
};

exports.run = (client, message, args) => {

    const authorUser = message.author;
    const authorMember = message.guild.member(authorUser);
    const toVoiceChannel = authorMember.voice.channel;
    const firstArg = args[0];

    if (firstArg === 'list') {
        let result = '';
        soundMappings.keyArray().forEach(item => result += `${item}, `);
        message.channel.send(result);
        return;
    } else if (firstArg === 'stop') {
        processQueue(client);
        return;
    } else if (firstArg === 'terminate') {
        queue = [];
        processQueue(client);
        return;
    } else if (soundMappings.has(firstArg)) {
        let path = soundMappings.get(firstArg);
        queue.push({toVoiceChannel, path});
    } else {
        message.channel.send(`'${firstArg}' is not a valid argument.`);
        return;
    }

    if (!processingQueue) {
        processingQueue = true;
        processQueue(client);
    }
};

function processQueue(client) {
    if (queue.length === 0) {
        processingQueue = false;
        client.voice.connections.array().forEach(connection => connection.disconnect());
    } else {
        const nextItemInQueue = queue.shift();
        nextItemInQueue.toVoiceChannel.join().then(connection => {
            const dispatcher = connection.play(nextItemInQueue.path);
            dispatcher.on('finish', () => {
                processQueue(client);
            });
        }).catch(console.error);
    }
}

exports.webhookPlay = (args, user, client) => {
    const firstArg = args[0];
    const toVoiceChannel = user.voice.channel;
    if (firstArg === 'stop') {
        processQueue(client);
        return;
    } else if (firstArg === 'terminate') {
        queue = [];
        processQueue(client);
        return;
    } else {
        args.forEach((arg) => {
            if (soundMappings.has(arg)) {
                let path = soundMappings.get(arg);
                queue.push({toVoiceChannel, path});
            }
        });
    }

    if (!processingQueue) {
        processingQueue = true;
        processQueue(client);
    }
}
