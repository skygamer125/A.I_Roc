//Import the commands needed
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageAttachment } = require("discord.js");

//Create global variables for priority alert
var alert;
var alertColour;
var alertpath;

//Set up the command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")                                              //Command name
    .setDescription("A.I Roc will report the ticket to the STAFF!") //Command Description
    .addStringOption((option) =>
      option
        .setName("title")                                           //Add String input
        .setDescription("The title of the ticket")                  //Description
        .setRequired(true)
    ) //Make it required
    .addStringOption((option) =>
      option
        .setName("description")                                     //Do the same as above
        .setDescription("The Description of the ticket")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("priority")                                        //same as above
        .setDescription("The priority of the ticket")
        .addChoice("High", "H")                                     //Add choices H, M, L
        .addChoice("Medium", "M")
        .addChoice("Low", "L")
        .setRequired(true)
    ), //Require them and limit the answers to only H, M, L

  //Execute the command when called
  async execute(interaction) {
    //Check if the interaction came from the right channel
    if (interaction.channelId === "905523285884817429") {
      //Switch the priority field and set the variables accordingly
      switch (interaction.options.get("priority").value) {
        //High Priority
        case "H":
          alert = new MessageAttachment("./resources/alert_high.png");    //Attach the image
          alertpath = "attachment://alert_high.png";                      //Set image path
          alertColour = "#e23f06";                                        //Set card colour
          break;

        //Medium priority
        case "M":
          alert = new MessageAttachment("./resources/alert_medium.png");  //Same here
          alertpath = "attachment://alert_medium.png";
          alertColour = "#ffa500";
          break;

        //Low Priority
        case "L":
          alert = new MessageAttachment("./resources/alert_low.png");     //same here
          alertpath = "attachment://alert_low.png";
          alertColour = "#a6d784";
          break;
      }

      //create embed message for reply to the ticket
      const embed = new MessageEmbed()
        .setColor(alertColour)                                                  //Colour of the Embed
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())   //Set the author of the ticket
        .setTitle(interaction.options.get("title").value)                       //Set the title field with the information from slash command
        .addField("Description:", interaction.options.get("description").value) //Set the description field with the information from slash command
        .addField("Link to the user:", `<@${interaction.user.id}>`)             //Create a link for the user so the moderators can click it and get in touch easily
        .setThumbnail(alertpath)                                                //Set the path for the priority file image
        .setTimestamp();                                                        //Set the timestamp of when it was created, so mods can react in time

      //Search for the correct channel to send the message to
      interaction.client.channels.cache
        .get("905523793013903410")
        .send({ embeds: [embed], files: [alert] });

      //Send a ping to the mods if priority is high
      if (interaction.options.get("priority").value === "H") {
        interaction.client.channels.cache
          .get("905523793013903410")
          .send(`@here`);
      }

      //Inform the user about the ticket being sent
      await interaction.reply({ content: "TICKET SENT!", ephemeral: true });
    } else {
      //Inform the user that the channel used was incorrect
      await interaction.reply({
        content: "DONT USE THAT COMMAND HERE!",
        ephemeral: true,
      });
    }
  },
};
