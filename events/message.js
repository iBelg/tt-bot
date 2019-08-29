module.exports = (client, message) => {
  // we do not care about other bots
  if (message.author.bot) return;
  
  // Only process messages that start with our prefix
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;
  
  const args = message.content.slice(process.env.PREFIX.length).trim().split('/ +/g');
  const command = args.shift().toLowerCase();
  
  
};