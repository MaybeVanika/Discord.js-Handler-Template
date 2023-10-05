const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    aliases: ['pong'],
    cat: 'utils',
    run: async(client,args,prefix,message) => {
        let ping = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor({name: " | Pong "+client.ws.ping+"ms", iconURL: message.author.displayAvatarURL({dynamic: true})})

        return message.reply({
            embeds: [
                ping
            ]
        })
    }
}