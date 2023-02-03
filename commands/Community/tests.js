const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('SLASH COMMAND DESC'),
    async execute(interaction, client) {
        await interaction.reply({ content: `The bot is working!`})
    },
}