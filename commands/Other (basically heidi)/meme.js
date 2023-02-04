const { SlashCommandBuilder, EmbedBuilder, AuditLogEvent } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // since require is not supported, we will use this 
//workaround to import node-fetch

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Funniest memes on reddit!")
        .addStringOption(option =>
            option.setName("platform")
                .setDescription("Meme platform (optional)")
                .addChoices(
                    { name: "Reddit", value: "reddit" },
                )
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const platform = options.getString("platform");

        const embed = new EmbedBuilder();

        async function redditMeme() {
            await fetch('https://www.reddit.com/r/cursedcomments/random/.json').then(async res => {
                let meme = await res.json();

                console.log(meme);

                let title = meme[0].data.children[0].data.title;
                let url = meme[0].data.children[0].data.url;
                let author = meme[0].data.children[0].data.author;

                return interaction.member.send({ embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Random").setFooter({ text: author })] });
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