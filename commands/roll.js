const utils = require('../utils.js');

exports.usage = (client) => {
    return `
    ${client.config.prefix}roll
    ${client.config.prefix}roll <max>
    ${client.config.prefix}roll <min> <max>
    `;
};

exports.run = (client, message, args) => {
    let minRoll = 0;
    let maxRoll = 100;
    let result = -1;
    if (args.length === 1) {
        maxRoll = args[0];
    } else if (args.length === 2) {
        minRoll = Math.min(...args);
        maxRoll = Math.max(...args);
    }

    try {
        minRoll = Number(minRoll);
        maxRoll = Number(maxRoll);
        result = utils.randomNumber(minRoll, maxRoll);
    } catch (exception) {
        message.channel.send(`I can't handle the numbers!`)
            .then((message) => {
                message.react('😭');
            });
        return;
    }

    message.channel.send(`${message.author.toString()} rolled a ${result} (${minRoll} - ${maxRoll}).`);
};
