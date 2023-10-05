const client = require("../index.js")
const mongoose = require('mongoose');
const fs = require('node:fs');

let i = 0;
fs.readdirSync(`./src/commands/`).forEach(x => {
    fs.readdirSync(`./src/commands/${x}/`).filter(file => file.endsWith(".js")).forEach(cmd => {
        let command = require(`${process.cwd()}/src/commands/${x}/${cmd}`);
        client.commands.set(command.name, command);
        i++;
    })
});
console.log(`${i} Commands Loaded`);

let d = 0;
fs.readdirSync(`./src/events/`).forEach(file => {
    require(`${process.cwd()}/src/events/${file}`);
    d++;
});
console.log(`Client Events Loaded`);


(async () => {
    await mongoose.connect(client.config.mongo);
    console.log(`Mongoose Database Connected`);
})();