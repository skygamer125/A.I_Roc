// Run node deploy-commands.js every time a new command is added*

// All the requirements needed for the deployment to work successfully.
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.TOKEN || "ODg5MjE4ODU5NDMxNzc2Mjg3.YUeDmA.sbEV8bFGzK2p3V5oZGEhot21304";
const guildId = process.env.GUILD_ID || "882416103698079774";
const clientId = process.env.CLIENT_ID || "889218859431776287";

//reading command files
const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

//Register commands
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();