const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require("../../config.json");
const mysql = require('mysql');


// Connexion BDD
const db = new mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});


// Infos
exports.help = {
    name:"ticket"
}


exports.run = async (bot, message, args) => {
    if (message.member.permissions.has(['ADMINISTRATOR'] || [])) {
        db.query(`SELECT * FROM ticket WHERE guildId = "${message.guild.id}"`, (err, req) => {
            const channel = req[0].channel_ticket;

            message.delete()

            if(message.channel.id === channel){
                const TICKET = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('**Réagissez avec 📩 pour créer un ticket !**')
                    .setDescription(`Créez un ticket d'assistance pour contacter un membre du staff..`)
                    .setTimestamp()
                    .setFooter({ text: config.client.name, iconURL: config.client.logo});

                var row = new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setCustomId('ticket-button')
                        .setEmoji('📩')
                        .setLabel('Ouvrir un ticket')
                        .setStyle('PRIMARY')
                    );

                message.channel.send({ embeds: [TICKET], components: [row] });
            } else {
                const NULL_CHANNEL = new MessageEmbed()
	            .setColor('#0099ff')
	            .setTitle('**Ticket**')
	            .setDescription(`⛔ - Mauvais salons.`)
	            .setTimestamp()
	            .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.channel.send({ embeds: [NULL_CHANNEL] });
            }
        })
    } else {
        const NULL_PERMS = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('**Ticket**')
	        .setDescription(`⛔ - Tu n'as pas la permissions d'executer cette commandes.`)
	        .setTimestamp()
	        .setFooter({ text: config.client.name, iconURL: config.client.logo});

        message.delete()
        message.channel.send({ embeds: [NULL_PERMS] });
    }
}