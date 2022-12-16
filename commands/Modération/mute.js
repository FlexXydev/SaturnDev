const config = require('../../config.json');
const ms = require('ms');
const mysql = require('mysql');


// Connexion DB
const connection = new mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});


exports.help = {
    name:"mute"
}


exports.run = async (bot, message, args) => {
    let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value);

    message.delete();

    if(!user) return message.channel.send(`Aucune personne trouvé.`);

    let time = message.user ? args._hoistedOptions[1].value : args[1]

    if(!time) return message.channel.send(`Veuillez indiquer une durée !`);
    if(!parseInt(ms(time))) return message.channel.send(`Le temps indiqué est invalide !`);
    if(ms(time) > 2419200000) return message.channel.send(`Le temps ne peut pas être supérieur à 28 jours !`);

    let reason = message.user ? (args._hoistedOptions.length > 2 ? args._hoistedOptions[2].value : undefined) : args.slice(2).join(" ");
    if(!reason) return message.channel.send(`Aucune raison donnée !`);

    if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.channel.send(`Vous ne pouvez pas vous rendre muet vous-même !`);
    if(user.id === message.guild.ownerId) return message.channel.send(`Vous ne pouvez pas rendre muet cette personne !`);
    if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.channel.send(`Vous ne pouvez pas rendre muet cette personne !`);
    if(message.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.channel.send(`Cette personne est déjà mute !`);

    try {
        await user.send(`${message.user === undefined ? message.author.tag : message.user.tag} vous à rendu muet pendant ${time} du serveur ${message.guild.name} pour la raison : ${reason} !`)
    } catch (err) {}

    let sql = `INSERT INTO mutes (userID, authorID, guildID, reason, date, time) VALUES (${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${message.guild.id}', '${reason}', '${Date.now()}', '${time}')`
    connection.connect(
console.log('Connection établie')
);

connection.query(sql, function(err) {
        if(err) throw err;
    })

    await message.guild.members.cache.get(user.id).timeout(ms(time), reason);
    await message.channel.send(`✅ - **${user.tag}** à été rendu muet par **${message.user === undefined ? message.author.tag : message.user.tag}** pendant **${time}** pour la raison **${reason}** !`)

    setTimeout(function(){
        connection.connect(
console.log('Connection établie')
);

connection.query(`DELETE FROM mutes WHERE guildID = '${message.guild.id}' AND userID = '${user.id}'`);
    }, time)
}