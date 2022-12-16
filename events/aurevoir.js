const config = require('../config.json');
const mysql = require('mysql');
const { MessageEmbed } = require('discord.js');


// Connexion DB
const connection = new mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});


module.exports = {
    name: 'guildMemberRemove',
    execute(member, bot) {
        connection.connect(
console.log('Connection établie')
);

connection.query(`SELECT * FROM guildconfigurable WHERE guildId = "${member.guild.id}"`, (err, req) => {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            const quit = req[0].quit;

            if(quit == null) return;
            
            const QUIT = new MessageEmbed()
            .setColor(randomColor)
            .setTitle('Aurevoir')
            .setDescription(`<@${member.id}> Nous à quitté !`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo })

            bot.channels.cache.get(quit).send({ embeds: [QUIT] });
        });
    }
}