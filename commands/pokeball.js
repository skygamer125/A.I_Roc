const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokeball')
		.setDescription('Initializes POKEBALL.EXE program'),
	async execute(interaction) {
		await interaction.reply('POKEBALL.EXE INITIALIZED');
	},
};