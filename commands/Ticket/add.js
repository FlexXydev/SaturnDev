const config = require('../../config.json');
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


exports.help = {
    name:"add"
}

exports.run = async (bot, message) => {
    if(message.member.permissions.has(['MANAGE_MESSAGES'])) {
        connection.connect(
console.log('Connection établie')
);

connection.query(`SELECT * FROM ticket WHERE guildId = "${message.guild.id}"`, (err, req) => {
            const roles = req[0].roles;
            const user = message.mentions.users.first();

            const NULL = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**Ticket**')
            .setDescription(`⛔ - Mauvais usage de la commandes. (add <member>)`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo});

            message.delete()

            if(!user) {
                message.channel.send({ embeds: [NULL] })
            } else if (message.channel.name.includes('ticket')) {
                message.channel.edit({
                    permissionOverwrites: [{
                        id: user,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
                      {
                        id: roles,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
                      {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                      },
                    ],
                }).then(async () => {
                    const ADD = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('**Ticket**')
                    .setDescription(`<@${user.id}> à été ajouté au ticket !`)
                    .setTimestamp()
                    .setFooter({ text: config.client.name, iconURL: config.client.logo});

                    message.channel.send({ embeds: [ADD] })
                });
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