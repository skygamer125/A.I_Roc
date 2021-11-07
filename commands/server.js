//Import the commands needed
const { SlashCommandBuilder } = require("@discordjs/builders");

//Set up the command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")                                //Command name
    .setDescription("run LYCA.EXE Server Database"),  //Command description

  //Execute the command when called
  async execute(interaction) {
    //Reply to the interaction with the necessary information formatted
    await interaction.reply(`
        LISTING DATABASE...
        ======================================
        PORTAL NAME: ${interaction.guild.name}
        ======================================
        ABYSS MEMBERS: ${interaction.guild.memberCount}
        ======================================
        PORTAL CREATION DATE: ${interaction.guild.createdAt}
        ======================================
...DATABASE LISTED SUCCESSFULLY!
        `);
  },
};
