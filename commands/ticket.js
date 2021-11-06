const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

var alert;
var alertColour;
var alertpath;

module.exports = {
    data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('A.I Roc will report the ticket to the STAFF!')
        .addStringOption( option => option.setName('title')
            .setDescription('The title of the ticket')
            .setRequired(true))
        .addStringOption( option => option.setName('description')
            .setDescription('The Description of the ticket')
            .setRequired(true))
        .addStringOption( option => option.setName('priority')
            .setDescription('The priority of the ticket')
            .addChoice("High", "H")
            .addChoice("Medium", "M")
            .addChoice("Low", "L")
            .setRequired(true)),

	async execute(interaction) {
        if(interaction.channelId === "905523285884817429"){
            
            switch(interaction.options.get("priority").value){
                case "H":
                    alert = new MessageAttachment('./resources/alert_high.png');
                    alertpath = 'attachment://alert_high.png'
                    alertColour = '#e23f06';
                    break;
                case "M":
                    alert = new MessageAttachment('./resources/alert_medium.png');
                    alertpath = 'attachment://alert_medium.png'
                    alertColour = '#ffa500';
                    break;
                case "L":
                    alert = new MessageAttachment('./resources/alert_low.png')
                    alertpath = 'attachment://alert_low.png'
                    alertColour = '#a6d784';
                    break;
            }

            //create embed message for reply
            const embed = new MessageEmbed()
            .setColor(alertColour)
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setTitle(interaction.options.get("title").value)
            .addField('Description:', interaction.options.get("description").value)
            .addField('Link to the user:', `<@${interaction.user.id}>`)
            .setThumbnail(alertpath)
            .setTimestamp()

            interaction.client.channels.cache.get('905523793013903410').send({ embeds: [embed], files: [alert] })

            if(interaction.options.get("priority").value === "H"){
                interaction.client.channels.cache.get('905523793013903410').send(`@here`)
            }
            

            //client.channels.find(channel => channel.name == "905523793013903410") //send message to channel                     
            //.send(interaction.options.get("input").value)   //get input from user

            await interaction.reply({ content: 'TICKET SENT!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'DONT USE THAT COMMAND HERE!', ephemeral: true });
        }
    }
}