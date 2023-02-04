const {SlashCommandBuilder} = require('@discordjs/builders')
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, permissionOverwites, ButtonInteraction, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('The ticket Command'),
    async execute (interaction, client) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({content: 'You cant do that, dumb fuck'});
        
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('📩')
            .setLabel('Purchase/Contact')
            .setStyle(ButtonStyle.Secondary),
        )
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Tickets & Purchases")
        .setDescription('Click the button below to make a purchase or contact us.')

        await interaction.reply({ embeds: [embed], components: [button]});

        const collector = await interaction.channel.createMessageComponentCollector();
        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button] });

            const channel = await interaction.guild.channels.create({
                name: `ticket ${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: '1068569975650013225'
            });
            channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true} );
            channel.permissionOverwites.create(channel.guild.roles.everyone, {ViewChannel: false, SendMessages: false});

            channel.sent({content: `Welcome to your ticket, ${i.user}. Staff will arrive shortly to assist you with your purchase.`})
            i.user.send(`Your Ticket in ${i.guild.name} has been created.`)
        })
    }
}