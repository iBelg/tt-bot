const utils = require('../utils.js');
const fs = require('fs');
const Enmap = require('enmap');

let soundMappings;
let currentTimeout;
let busy = false;

exports.setup = (client) => {
    fs.readdir('./sounds/', (err, files) => {
        if (err) return console.error(err);
        if (files.length > 0) {
            soundMappings = new Enmap();
        }
        files.forEach(file => {
            const soundName = file.split('.')[0];
            soundMappings.set(soundName, file);
        });
    });
};

exports.usage = (client) => {
    return `
    Play a sound in your current voice channel.
    ${client.config.prefix}play <sound name> - play this sound
    ${client.config.prefix}play list - lists all sound names
    `;
};

exports.run = (client, message, args) => {

    const authorUser = message.author;
    const authorMember = message.guild.member(authorUser);
    const toVoiceChannel = authorMember.voiceChannel;
    const soundname = args[0];

    if (soundname === 'list') {
        let result = '';
        soundMappings.keyArray().forEach(item => result += `${item}\n`);
        message.channel.send(result);
        return;
    } else if (soundname === 'stop') {
        toVoiceChannel.leave();
        busy = false;
        return;
    }

    if (busy) {
        message.channel.send('I am currently busy. Try again in a sec.');
        return;
    } else {
        busy = true;
    }

    let filename;
    if (soundMappings.has(soundname)) {
        filename = soundMappings.get(soundname);
    }
    if (toVoiceChannel != null && filename) {
        toVoiceChannel.join()
            .then(connection => {
                if (currentTimeout) clearTimeout(currentTimeout);
                currentTimeout = setTimeout(() => {
                    finish(connection);
                }, 1000 * 60 * 15);
                try {
                    const path = `./sounds/${filename}`;
                    const dispatcher = connection.playFile(path);
                    dispatcher.on('end', () => {
                        finish(connection);
                    });
                } catch (e) {
                    console.error(e);
                    connection.disconnect();
                    busy = false;
                }
            }).catch(err => {
            console.log(err);
            toVoiceChannel.leave();
            busy = false;
        });
    }
};


function finish(connection) {
    const tempTimeout = setTimeout(() => {
        if (connection.status !== 4) {
            connection.disconnect();
        }
        clearTimeout(currentTimeout);
        currentTimeout = undefined;
        busy = false;
        clearTimeout(tempTimeout);
    }, 2000);
}

