const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
    partials: ["CHANNEL","GUILD_MEMBER","MESSAGE","REACTION","USER"],
    allowedMentions: {
        repliedUser: true,
        parse: ["everyone","roles","users"]
    }
});
module.exports = client;

client.config = require('./config.json')
client.emoji = require('./emojis.json')
client.commands = new Collection();
client.events = new Collection();

require(`${process.cwd()}/src/handler/main.js`);

client.login(client.config.token);

process.on('unhandledRejection', async(er) => {
    console.log(er);
});

process.on('uncaughtException', async(err) => {
    console.log(err);
})