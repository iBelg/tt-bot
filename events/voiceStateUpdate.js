const utils = require('../utils.js');

module.exports = (client, oldState, newState) => {
  if (newState.member.user.bot) return;
  const userGuild = newState.guild;
  const serverChangesChannel = getServerChangesChannel(userGuild, client);
  const oldChannelName = oldState.channel ? oldState.channel.name : undefined;
  const newChannelName = newState.channel ? newState.channel.name : undefined;
  const username = newState.member.displayName;
  
  Promise.resolve(serverChangesChannel).then((scChannel) => {
    if (oldChannelName !== newChannelName) {
      if (oldChannelName === undefined) {
        scChannel.send(`${username} has joined **${newChannelName}**`);
      } else if (newChannelName === undefined) {
        scChannel.send(`${username} has left **${oldChannelName}**`);
      } else {
        scChannel.send(`${username} switched from **${oldChannelName}** to **${newChannelName}**`);
      }
    }
  }, console.error);
};

function getServerChangesChannel(guild, client) {
  return utils.getServerChangesChannel(guild, client) || createServerChangesChannel(guild, client);
}

function createServerChangesChannel(guild, client) {
  const serverChangesChannelName = client.config.serverChangesChannel;
  const defaultRoleId = guild.id; // guild id counts as default role id
  return guild.channels.create(serverChangesChannelName, { type: 'text', permissionOverwrites: [
    {
      id: defaultRoleId,
      deny: ['SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'MENTION_EVERYONE'],
      allow: ['USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS']
    }
  ] });
}
