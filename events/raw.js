const utils = require('../utils.js');

module.exports = (client, packet) => {
    const eventName = utils.snakeToCamel(packet.t);
    const event = client.rawEvents.get(eventName);
    if (event) {
        event.process(client, packet.d);
    } else {
        // console.log(`Unknown raw event: ${eventName}`);
    }
};
