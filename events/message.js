module.exports = (client, message) => {
  // we do not care about other bots
  if (message.author.bot) return;
  
  // Only process messages that start with our prefix
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const cmd = client.commands.get(command);
  
  if (!cmd) return;
  
  cmd.run(client, message, args);
};
