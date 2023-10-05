const client = require("../index.js");

client.on("ready",() => {
    client.user.setPresence({
        activities: [{
            name: 'V13 Handler',
            type: 'PLAYING'
        }], status: 'dnd'
    });
    console.log(`${client.user.username} Is Online`);
})