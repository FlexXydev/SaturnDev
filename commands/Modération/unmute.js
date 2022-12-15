const config = require('../../config.json');
const mysql = require('mysql');


// Connexion DB
const connection = new mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});


exports.help ={
    name:"unmute"
}


exports.run = async (bot, message, args) => {
    message.delete();
    
    let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (message.mentions.users.first() || bot.users.cache.get(args[0].value));
    if(!user) return message.channel.send(`Aucunce personne trouvé !`);

    let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ");
    if(!reason) return message.channel.send(`Aucune raison donnée`);

    if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.channel.send(`Vous ne pouvez pas vous rendre muet vous-même !`);
    if(user.id === message.guild.ownerId) return message.channel.send(`Vous ne pouvez pas rendre muet cette personne !`);
    if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.channel.send(`Vous ne pouvez pas rendre muet cette personne !`);
    if(!message.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.channel.send(`Cette personne est déjà mute !`);

    try {
        await user.send(`<@${message.author.id}> vous à rendu votre parole sur le serveur **${message.guild.name}**.`)
    } catch (err) {}

    message.guild.members.cache.get(user.id).timeout(null, `${reason} (Parole rendu par <@${message.author.id}>)`)
    message.channel.send(`<@${message.author.id}> à rendu la parole de **${user.tag}**.`)

    connection.connect(
console.log('Connection établie')
);

connection.query(`DELETE FROM mutes WHERE guildID = '${message.guild.id}' AND userID = '${user.id}'`);
}