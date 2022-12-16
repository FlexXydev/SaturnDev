const mysql = require('mysql');
const config = require('../config.json');


// Connexion DB
const connection = new mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});


module.exports = {
    name: 'messageCreate',
    async execute(message, member) {
        if(message.author.bot) return;

        //XP
        connection.connect(


connection.query(`SELECT * FROM xp WHERE guildId = "${message.guild.id}" AND id_user = "${message.author.id}"`, async (err, req) => {
            if(err) throw err;

            if(req.length < 1){
                connection.connect(


connection.query(`INSERT INTO xp (guildId, id_user, xp) VALUES ("${message.guild.id}", "${message.author.id}", "${generateXp()}")`)
            } else {
                // UP XP
                const xp = req[0].xp;
                var xpavant = Number(xp), ge = Number(generateXp()), result;
                result = xpavant + ge;

                //UP LEVEL
                const level = req[0].level;
                const xplevel = level * level * 100;

                connection.connect(


connection.query(`UPDATE xp set xp = ${result} WHERE guildId = '${message.guild.id}' AND id_user = '${message.author.id}'`)

                if(xp >= xplevel){
                    connection.connect(


connection.query(`UPDATE xp set level = ${Number(level) + Number(1)} WHERE guildId = '${message.guild.id}' AND id_user = '${message.author.id}'`)
                    await message.channel.send(`Félicitation ${message.author} tu viens de passer level ${Number(level) + Number(1)} !`)
                }
            }
        })
    }
}

function generateXp() {
    let min = 10;
    let max = 20;

    return Math.floor(Math.random() * (max - min)) + min;
}