const { Client, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Events, GuildMember, GuildHubType, AuditLogEvent, Intents, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Object.keys(GatewayIntentBits)] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

client.on('guildMemberAdd', member => {
    console.log('User @' + member.user.tag + ' has joined the server!');
    await member.roles.add("1062128466201427998");
});

//Mod Log System
//client.on(Events.MessageDelete, async message => {

    //message.guild.fetchAuditLogs({
        //type: AuditLogEvent.MessageDelete,
    //})
    //.then(async audit => {
        //const { executor } = audit.entries.last()

        //const mes = message.content;

        //if (!mes) return;

        //const channelID = '898293748121862215';
        //const mchannel = await message.guild.channels.cache.get(channelID);

        //const embed = new EmbedBuilder()
        //.setColor("Red")
        //.setTitle("Message Deleted")
        //.addFields({ name: "Message Content", value: `${mes}`, inline: false})
        //.addFields({ name: "Message Channel", value: `${message.channel}`, inline: false})
        //.addFields({ name: "Deleted By", value: `${executor.tag}`, inline: false})
        //.setTimestamp()
        //.setFooter({ text: "Mod Logging System"})

        //mchannel.send({ embeds: [embed] })
    //})
//})

