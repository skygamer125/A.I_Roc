//React to Interactions (slash commands)
module.exports = {
  //The name of the event
  name: "interactionCreate",

  //Execute after the event is started
  async execute(interaction) {
    //If it isnt a command, return
    if (!interaction.isCommand()) return;

    //Get the command bot requested.
    const command = interaction.client.commands.get(interaction.commandName);

    //If the command isnt found, return
    if (!command) return;

    //Try to execute the command, otherwise show the error to user.
    try {
      await command.execute(interaction);
    } catch (error) {
      //Log the error and inform the user about it
      console.error(error);
      return interaction.reply({ content: "LYCA.EXE ERROR", ephemeral: true });
    }
  },
};
