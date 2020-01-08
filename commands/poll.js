const Discord = require('discord.js');
const utils = require('../utils');

const possibleReactions = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];

exports.usage = (client) => {
    return `${client.config.prefix}poll <description>|<option1>|<option2>|...`;
};

exports.setup = (client) => {
    // listen to raw event messageReactionAdd
    client.eventEmitter.on('messageReactionAdd', (data) => {
        if (!utils.isMyMessage(client, data.message) || data.member.user.id === client.user.id) {
            return;
        }
        const titleRegex = /^.*? created a poll!$/g;
        const embed = data.message.embeds ? data.message.embeds[0] : undefined;
        const channel = data.message.channel;
        if (embed) {
            if (titleRegex.test(embed.title) && data.emoji.name && data.emoji.name === utils.informationIcon()) {
                (async () => {
                    const reactionTallyEmbed = new Discord.RichEmbed()
                        .setTitle(`A tally of all the reactions (requested by ${data.member.user.username})`)
                        .setColor(0xFF0000)
                        .setDescription(embed.description)
                        .addBlankField();
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
                        reactionTallyEmbed.addField(`${reaction.emoji.name} (${reaction.count - 1})`, userString || '\u200b');
                    }

                    channel.send(reactionTallyEmbed);
                })();
            }
        }
    });
};

exports.run = (client, message, args) => {
    const options = args.join(' ').split('|');
    const description = options.shift();

    if (!options) return;

    if (options.length > 10) {
        message.channel.send('A maximum of ten options is allowed.');
        return;
    } else if (options.length <= 1) {
        message.channel.send('A minimum of two options is required.');
        return;
    }

    let optionsString = '';
    options.forEach((option, index) => {
        optionsString += `${possibleReactions[index]} => ${option}\n`;
    });

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    const embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} created a poll!`)
        .setColor(0xC30EA9)
        .setDescription(`${description}\n
        Options: \n
        ${optionsString}
      `);
    message.channel.send(embed)
        .then(async (message) => {
            await asyncForEach(options, async (option, index) => {
                await message.react(possibleReactions[index]);
            });
            await message.react(utils.informationIcon());
        });
};
