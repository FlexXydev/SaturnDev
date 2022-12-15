const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');


exports.help = {
    name:"rename"
}


exports.run = async (bot, message, args) => {
    if(message.member.permissions.has(['MANAGE_MESSAGES'])) {
        if(!args[0]){
            const NULL = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**Ticket**')
            .setDescription(`⛔ - Tu dois mettre le nom souhaiter.`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo});

            message.delete()
            message.channel.send({ embeds: [NULL] });
        } else {
            message.channel.setName(`ticket-${args[0]}`)
            const RENAME = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**Ticket**')
            .setDescription(`Le ticket à été renommé sous le nom de "ticket-${args[0]}" !`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo});

            message.delete()
            message.channel.send({ embeds: [RENAME] });
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