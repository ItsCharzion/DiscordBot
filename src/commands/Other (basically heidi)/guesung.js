const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('guesung')
    .setDescription('guesung command??'),
    async execute(interaction, client) {
        await interaction.reply({ content: `https://media.discordapp.net/attachments/913175848138473543/1050624687643824238/unknown.png`})
    },

}