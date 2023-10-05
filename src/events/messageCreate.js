const client = require("../index.js");
const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require("discord.js");

client.on("messageCreate", async message => {
    if(!message.guild || message.author.bot) return;
    let prefix = client.config.prefix;

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Invite "+client.user.username)
        .setStyle("LINK")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),

        new MessageButton()
        .setLabel("Support HQ")
        .setStyle("LINK")
        .setURL(client.config.support),

        new MessageButton()
        .setLabel("Source Code")
        .setStyle("LINK")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot")
    )

    if(message.content == "<@"+client.user.id+">") {
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Hey, I'm **${client.user.username}**\n\nPlease use the following command instead: \`${client.config.prefix}help\`\n\nIf you are having problems, consider asking for help at [Support](${client.config.support})`)
            ], components: [row]
        });
    }

    let regex = RegExp(`<@!?${client.user.id}>`);
    let pre = message.content.match(regex) ? message.content.match(regex)[0] : prefix;
    let np = ['991312753279127652'];

    if(!np.includes(message.author.id)) {
        if(!message.content.starsWith(pre)) return;
    }

    const args = np.includes(message.author.id) == false ? message.content.slice(pre.length).trim().split(/ +/g) : message.content.startsWith(pre) == true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const cmds = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
    if (!cmds || cmds === undefined) return;

    if (!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.VIEW_CHANNEL)) return;
    if (!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.SEND_MESSAGES)) return message.author.send({ content: `I don't have \`SEND_MESSAGES\` permissions in that channel` });
    if (!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) return message.channel.send({ content: `I don't have \`USE_EXTERNAL_EMOJIS\` permissions here.` })
    if (!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.EMBED_LINKS)) return message.channel.send({ content: `I don't have \`EMEBD_LINKS\` permissions here.` });

    cmds.run(client,args,prefix,message).catch(e => {
        console.log(e); 
        message.channel.send({ 
            content: `${e.message}`
         })
     })
})