const { SlashCommandBuilder, EmbedBuilder, AuditLogEvent, messageLink } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // since require is not supported, we will use this 
//workaround to import node-fetch

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gayhentai")
        .setDescription("If you run this command you down bad asf")
        .addStringOption(option =>
            option.setName("platform")
                .setDescription("Meme platform (optional)")
                .addChoices(
                    { name: "Reddit", value: "reddit" },
                )
        ),

    async execute(interaction) {
        interaction.reply('Message has been sent to DMs ;)')
        const { guild, options, member } = interaction;

        const platform = options.getString("platform");

        const embed = new EmbedBuilder();

        async function redditMeme() {
            await fetch('https://www.reddit.com/r/FemboyHentai/random/.json').then(async res => {
                let meme = await res.json();

                console.log(meme);

                let title = meme[0].data.children[0].data.title;
                let url = meme[0].data.children[0].data.url;
                let author = meme[0].data.children[0].data.author;

                interaction.member.send({ embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Random").setFooter({ text: author })] });
            
            });
        }

        if (platform === "reddit") {
            redditMeme();
        }
        //generating a random meme from any platform
        if (!platform) {
            let memes = [redditMeme];
            memes[Math.floor(Math.random() * memes.length)]();
        }
    }
}