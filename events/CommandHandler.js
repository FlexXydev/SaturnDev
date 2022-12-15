const config = require('../config.json');
const mysql = require('mysql');

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
        db.query(`SELECT * FROM guildconfigurable WHERE guildId = "${message.guild.id}"`, (err, req) => {
            const prefix = req[0].cmdPrefix;

            if(message.author.bot) return;
            if(message.channel.type === "dm") return;
            
            let messageArray = message.content.split(" ");
            let cmd = messageArray[0];
            let args = messageArray.slice(1);
    
            if(!cmd.startsWith(prefix)) return;
    
            let commandfile = bot.commands.get(cmd.slice(prefix.length));
            if(commandfile) commandfile.run(bot,message,args);
        })
    }
}