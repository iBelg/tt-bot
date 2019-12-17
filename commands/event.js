const Discord = require('discord.js');
const utils = require('../utils');

const requiredReactions = ['✅', '❎'];

exports.usage = (client) => {
    return `${client.config.prefix}event <description>`;
};

exports.setup = (client) => {
    // listen to raw event messageReactionAdd
    client.eventEmitter.on('messageReactionAdd', (data) => {
        if (!utils.isMyMessage(client, data.message) || data.member.user.id === client.user.id) {
            return;
        }
        const titleRegex = /^.*? created an event!$/g;
        const embed = data.message.embeds ? data.message.embeds[0] : undefined;
        const channel = data.message.channel;
        if (embed) {
            if (titleRegex.test(embed.title) && data.emoji.name && data.emoji.name === utils.informationIcon()) {
                (async () => {
                    const reactionTallyEmbed = new Discord.RichEmbed()
                        .setTitle(`A tally of all the reactions`)
                        .setColor(0xFF0000)
                        .setDescription(embed.description);
                    const voteableReactions = utils.getAllReactionsFromMessageByMe(data.message);

                    for (const reaction of voteableReactions) {
                        if (reaction.emoji.name === utils.informationIcon()) {
                            continue;
                        }
                        let userString = '';
                        let userCollection = await reaction.fetchUsers();
                        userCollection.array().filter((user) => user.id !== client.user.id).forEach((user, index, array) => {
                            userString += `${user.username}${index === array.length - 1 ? '' : ', '}`;
                        });
                        reactionTallyEmbed.addField(`${reaction.emoji.name} (${reaction.users.size})`, userString || '\u200b');
                    }

                    channel.send(reactionTallyEmbed);
                })();
            }
        }
    });
};

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} created an event!`)
        .setColor(0xFF0000)
        .setDescription(args.join(' '));
    message.channel.send('@everyone A new event has been created.');
    message.channel.send(embed)
        .then(async (message) => {
            for (const reaction of requiredReactions) {
                await message.react(reaction);
            }
            await message.react(utils.informationIcon());
        });
};
