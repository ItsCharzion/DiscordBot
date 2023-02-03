const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('heidi')
    .setDescription('kpop:))'),
    async execute(interaction, client) {
        const messages = ["https://cdn.discordapp.com/attachments/913175848138473543/1054553991033401375/v_proof_main_0.png", "https://media.discordapp.net/attachments/913175848138473543/1054554098185273474/q6VxB_5f.png?width=360&height=474", "https://media.discordapp.net/attachments/913175848138473543/1054554807416922132/IMG_0974.jpg?width=272&height=474", "https://media.discordapp.net/attachments/913175848138473543/1054555387405279332/IMG_0975.jpg?width=266&height=474"]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        await interaction.reply({ content: (randomMessage)})
    },

}