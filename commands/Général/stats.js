const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


exports.help = {
    name:"stats"
}


exports.run = async (bot, message) => {
    const STATS = new MessageEmbed()
    .setColor('DARK_BLUE')
    .setTitle(`Stats`)
    .addFields(
        { name: 'ID', value: `${message.guild.id}`},
        { name: 'ID du créateur', value: `${message.guild.ownerId}`},
        { name: 'Nom du serveur', value: `${message.guild.name}`},
        { name: 'Date de création du serveur', value: `${message.guild.createdAt.toLocaleDateString('en-GB')}`},
        { name: 'Nombre de membre sur le serveur', value: `${message.guild.memberCount}`}
    )
    .setTimestamp()
    .setFooter({ text: config.client.name, iconURL: config.client.logo });

    message.delete();
    message.channel.send({ embeds: [STATS] });
}