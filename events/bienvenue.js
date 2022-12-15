const config = require('../config.json');
const mysql = require('mysql');
const { MessageEmbed } = require('discord.js');


// Connexion DB
const db = new mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});


module.exports = {
    name: 'guildMemberAdd',
    execute(member, bot) {
        db.query(`SELECT * FROM guildconfigurable WHERE guildId = "${member.guild.id}"`, (err, req) => {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            const bienvenue = req[0].bienvenue;

            if(bienvenue == null) return;
            
            const BVN = new MessageEmbed()
            .setColor(randomColor)
            .setTitle('Bienvenue')
            .setDescription(`Hey, <@${member.id}> Bienvenue à toi sur le serveur !`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo })

            bot.channels.cache.get(bienvenue).send({ embeds: [BVN] });
        });
    }
}