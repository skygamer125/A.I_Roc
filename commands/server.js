const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('run LYCA.EXE Server Database'),
	async execute(interaction) {
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