const mysql = require('mysql');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');


// Connexion DB
const connection = new mysql.createConnection({
    host: config.BDD.host,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});

module.exports= {
    name: 'messageDelete',
    execute(message, bot) {
    

connection.query(`SELECT * FROM guildconfigurable WHERE guildId = "${message.guild.id}"`, (err, req) => {
            const channel = req[0].logs;

            if(message.author.bot) return;
            if(channel == null) return;

            const LOGS = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`**Message Supprimé**`)
            .setDescription("```" + message.content + "```")
            .addFields(
                { name: `👨 Utilisateur :`, value: `${message.author}`},
                { name: `🔊 Dans le salon :`, value: `<#${message.channel.id}>`},
            )
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo})

            bot.channels.cache.get(channel).send({ embeds: [LOGS] });
        });
    }
}