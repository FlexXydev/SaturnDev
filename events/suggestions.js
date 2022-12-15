const mysql = require('mysql');
const config = require('../config.json');
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
    name: 'messageCreate',
    execute(message, bot) {
        if(message.author.bot) return;

        db.query(`SELECT * FROM guildconfigurable WHERE guildId = "${message.guild.id}"`, (err, req) => {
            const channel = req[0].suggest;

            if(message.channel.id === channel) {
                var randomColor = Math.floor(Math.random()*16777215).toString(16);

                const embed = new MessageEmbed()
                .setColor(randomColor)
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTitle("Nouvelle suggestions")
                .setDescription("```fix\n " + message.content + "\n```")
                .setTimestamp()
                .setFooter({ text: 'Envoyé par: ' + message.author.tag, iconURL: `${message.author.displayAvatarURL()}`})

                message.channel
                .send({ embeds: [embed] })
                .then((message) => {
                  const sent = message;
                  sent
                    .react("👍")
                    .then(() => {
                      sent
                        .react("👎")
                    })
                    .catch(console.error);
                })
                .catch(console.error);

                return message.delete();
            }
        })
    }
}