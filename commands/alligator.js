//Import the commands needed
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(
    "9059cfca8ddb5f034f062ea3cade4ebc4ee57a548a0536b8d9e080e3fb1cce33"
);

//Search parameters
const params = {
    engine: "google",               //Engine search
    ijn: "1",                       //Page of results
    q: "Alligator",                 //Search Terms
    google_domain: "google.com",    //Domain
    tbm: "isch",                    //??
};

//Get randomized result from the page function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Set up the command
module.exports = {
    data: new SlashCommandBuilder()
        .setName("alligator")                           //Command name
        .setDescription("Runs ALLIGATOR.EXE program"),  //Command description

    //Execute the command when called
    async execute(interaction) {
        const rNum = getRandomInt(100); //Get random number
        var alligatorLink = "";         //Link for alligator variable

        //Wait for the search and sort json to find the image
        await search.json(params, (data) => {
            alligatorLink = data.images_results[rNum].thumbnail;    //Search for the image inside json object and set the alligatorLink variable to the correct link of the image

            //create embed message for reply
            const embed = new MessageEmbed()
                .setTitle("INITIALIZING ALLIGATOR.EXE PROGRAM...")  //Embed Title
                .setDescription("***ALLIGATOR NOISES***")           //Embed Description
                .setImage(alligatorLink);                           //Set the image with the link

            //reply to interaction
            interaction
                .reply({ embeds: [embed] })                         //Send embeed
                .catch(console.error);                              //Catch error
        });
    },
};
