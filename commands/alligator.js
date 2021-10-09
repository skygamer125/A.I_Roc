const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteractionOptionResolver, MessageEmbed } = require('discord.js');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("9059cfca8ddb5f034f062ea3cade4ebc4ee57a548a0536b8d9e080e3fb1cce33");

const params = {
    engine: "google",
    ijn: "1",
    q: "Alligator",
    google_domain: "google.com",
    tbm: "isch"
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alligator')
		.setDescription('Runs ALLIGATOR.EXE program'),
	async execute(interaction) {
        
        const rNum = getRandomInt(100);
        var alligatorLink = "";

        // Show result as JSON
        await search.json(params, data => {
            alligatorLink = data.images_results[rNum].thumbnail;

            //create embed message for reply
            const embed = new MessageEmbed()
            .setTitle('INITIALIZING ALLIGATOR.EXE PROGRAM...')
            .setDescription('***ALLIGATOR NOISES***')
            .setImage(alligatorLink);

            //reply to interaction
            interaction.reply({ embeds: [embed] })
            .catch(console.error);
        
        });

	},
};