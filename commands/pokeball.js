//Import the commands needed
const { SlashCommandBuilder } = require("@discordjs/builders");

//Set up the command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokeball")                                  //Command Name
    .setDescription("Initializes POKEBALL.EXE program"),  //Command Description

  //Execute the command when called
  async execute(interaction) {
    //Reply to the interaction
    await interaction.reply("POKEBALL.EXE INITIALIZED");
  },
};
