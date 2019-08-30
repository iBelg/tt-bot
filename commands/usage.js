const os = require('os');

exports.run = (client, message, args) => {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const usedMemory = totalMemory - freeMemory;
    const percentageUsed = (100 / totalMemory) * usedMemory;
    const percentageFree = (100 / totalMemory) * freeMemory;

    message.channel.send(`Total memory: ${totalMemory} | Used memory: ${usedMemory} (${percentageUsed}%) | Free memory: ${freeMemory} (${percentageFree}%)`);
};
