module.exports = (client, oldUser, newUser) => { 
  const userGuild = newUser.guild;
  const serverChangesChannel = getServerChangesChannel(userGuild, client);
  const oldChannelName = oldUser.voiceChannel ? oldUser.voiceChannel.name : undefined;
  const newChannelName = newUser.voiceChannel ? newUser.voiceChannel.name : undefined;
  const username = newUser.user.username;
  
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
  const channels = guild.channels.array();
  const serverChangesChannelName = client.config.serverChangesChannel;
  const serverChangesChannel = channels.find((channel) => channel.name === serverChangesChannelName);
  return serverChangesChannel || createServerChangesChannel(guild, client);
}

function createServerChangesChannel(guild, client) {
  const serverChangesChannelName = client.config.serverChangesChannel;
  const defaultRoleId = guild.id; // guild id counts as default role id
  return guild.createChannel(serverChangesChannelName, { type: 'text', permissionOverwrites: [
    {
      id: defaultRoleId,
      deny: ['SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'MENTION_EVERYONE'],
      allow: ['USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS']
    }
  ] });
}