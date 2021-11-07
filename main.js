//Log the current version of Node.js
console.log("Node.js version: " + process.version);

//Require the necessary discord.js classes
require("dotenv").config();                           //Requiring enviromental variables for HEROKU
const fs = require("fs");                             //File Stream
const { Client, Collection } = require("discord.js"); //Discord Library
const { REST } = require("@discordjs/rest");          //Rest API
const { Routes } = require("discord-api-types/v9");   //Routes for slash commands

//retrieve token from enviroment variables
const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

// Create a new client instance
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_PRESENCES",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
});

//Filter the event files path in an array
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

//Get the events up and running so they activate when needed
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args)); //set the events on the bot so it knows where they are (event, location)
  } else {
    client.on(event.name, (...args) => event.execute(...args)); //set the events on the bot so it knows where they are (event, location)
  }
}

//Set the slash commands of the bot
client.commands = new Collection();

//Put all commands in an array
const commands = [];
//Put all command files path in an array
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

//Get the commands up and running so they activate when needed
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command); //set the commands on the bot so it knows where they are (command, location)
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

//Register commands
(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();

// Login to Discord with your client's token
client.login(token);
