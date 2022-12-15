const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');


exports.help = {
    name:"close"
}


exports.run = async (bot, message) => {
    if(message.member.permissions.has(['MANAGE_MESSAGES'])) {
        if(!message.channel.name.includes('ticket')) {
            const NULL_TICKET = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**Ticket**')
            .setDescription(`⛔ - Vous ne vous trouvez pas dans un ticket.`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo});

            message.channel.send({ embeds: [NULL_TICKET] });
        } else {
            const SUPPR = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**Ticket**')
            .setDescription(`Suppression du ticket dans quelques secondes...`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo});

            message.delete()
            message.channel.send({ embeds: [SUPPR] });
            setTimeout(() => {
                message.channel.delete()
            }, 2500)
        }
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