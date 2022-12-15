const mysql = require('mysql');
const config = require('../../config.json');
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
    name:"ban"
}

exports.run = async (bot, message, args) => {
    if(message.member.permissions.has(['BAN_MEMBERS'])){
        user = message.mentions.users.first();
        let raison = args.slice(1).join(" ");

        message.delete();
        if(!user) return message.channel.send(`⛔ - Mauvais usage de la commandes. (ban <member> <raison>)`);
        if(!raison) return message.channel.send(`⛔ - Mauvais usage de la commandes. (ban <member> <raison>)`);

        user.send(`Vous avez été banni du serveur ${message.guild.name} par <@${message.author.id}> pour la raison : ${raison}`)

        await message.channel.send(`Le member ${user} à été banni du serveur.\nRaison : ${raison}\nPar : ${message.author.username}`)
        await message.guild.members.ban(user, {reason: raison});
    } else {
        const NULL_PERMS = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('**Action de modération**')
        .setDescription(`⛔ - Tu n'as pas la permissions d'executer cette commandes.`)
        .setTimestamp()
        .setFooter({ text: config.client.name, iconURL: config.client.logo});

        message.delete()
        message.channel.send({ embeds: [NULL_PERMS] });
    }
}