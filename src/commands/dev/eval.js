const { MessageEmbed } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    name: 'eval',
    aliases: ['evaluate'],
    cat: 'utils',
    run: async(client,args,prefix,message) => {
        let own = ["991312753279127652"]
        if(!own.includes(message.author.id)) return;

        if(!args[0]) return message.reply({
            content: `❌ Give something to evaluate!`
        })

        let evaluate = args.join(' ');
        if(evaluate.includes('token' || evaluate.includes('config'))) return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription("❌ I can't provide you that.")
            ]
        })

        let code;
        try {
            code = await eval(evaluate);
            code = inspect(code, { 
                depth: 0
             });
        } catch(e) {
            code = inspect(e, { 
                depth: 0
             })
        }

        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setAuthor({name: "Eval Result", iconURL: client.user.displayAvatarURL()})
                .setDescription(`\`\`\`js\n${code}\`\`\``)
            ]
        })
    }
}