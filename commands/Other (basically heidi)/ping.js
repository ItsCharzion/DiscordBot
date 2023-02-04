const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, WebhookClient } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    execute(interaction) {

        const id = '1053168025072832542';
        const token = "MTA1MzE2ODAyNTA3MjgzMjU0Mg.GPLbpr.2m26_773qmh_Y2o78ZXsKrNYvZ_u95lQwnwtxg";
        interaction.reply({ content: "pong (77ms)" });
    },
};