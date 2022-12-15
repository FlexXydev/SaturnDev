const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

exports.help = {
    name:"ping"
}

exports.run = async (bot, message, args) => {
    message.reply("Calcule du ping...").then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp
        const apiping = bot.ws.ping

        const exampleEmbed = new MessageEmbed()
        	.setColor('#0099ff')
        	.setTitle('**Ping**')
            .setDescription('🏓 Pong')
        	.addFields(
        		{ name: 'La latence du bot est de', value: `${ping}`, inline: false },
        		{ name: 'La latence de l\'API est de', value: `${apiping}`, inline: false },
        	)
        	.setTimestamp()
        	.setFooter({ text: config.client.name, iconURL: config.client.logo });
            
        message.channel.send({ embeds: [exampleEmbed] });

        message.delete({ timeout: 100 })
    })
}