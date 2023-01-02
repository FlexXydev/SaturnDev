const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const config = require('./config.json');
const fs = require('fs');
const mysql = require('mysql');
bot.commands = new Collection();

const { exec } = require('child_process');

app.get('/console', (req, res) => {
  exec('docker-compose logs -f', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.sendStatus(500);
    }
    res.send(stdout);
  });
});

// Connexion DB
const connection = new mysql.createConnection({
    host: config.BDD.host,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database,
});


// Command Handler
const commandFiles = fs.readdirSync(`./commands/`).filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands${file}`)

    console.log(`🤖 | La commandes ${file} est chargée avec succès !`)
    bot.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`🎊 | La commandes ${file} est chargée avec succès depuis ${folder} !`)
        bot.commands.set(props.help.name, props)
    }
})


// Event Handler
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot))
        console.log(`🎊 | L'event ${file} as été chargé avec succès`)
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot))
        console.log(`🎊 | L'event ${file} as été chargé avec succès`)
    }
}

const eventSubFolders = fs.readdirSync('./events/').filter(f => !f.endsWith('.js'))
eventSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./events/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const event = require(`./events/${folder}/${file}`)
        if(event.once) {
            bot.once(event.name, (...args) => event.execute(...args, bot))
            console.log(`🎊 | L'event ${file} as été chargé avec succès depuis ${folder}`)
        } else {
            bot.on(event.name, (...args) => event.execute(...args, bot))
            console.log(`🎊 | L'event ${file} as été chargé avec succès depuis ${folder}`)
        }
    }
})


// Bot sur plusieur serveur
bot.on("guildCreate", guild => {


connection.query(
        `INSERT INTO guilds(guildId, guildOwnerId, guildName) VALUES ("${guild.id}", "${guild.ownerId}", "${guild.name}")`
    )


connection.query(
        `INSERT INTO guildconfigurable(guildId) VALUES ("${guild.id}")`
    )


connection.query(
        `INSERT INTO ticket(guildId, guildOwnerId) VALUES ("${guild.id}", "${guild.ownerId}")`
    )
});

bot.login(config.token)