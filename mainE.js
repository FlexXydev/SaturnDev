const express = require('express');
const { Client, Intents, Collection, Message } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const app = express()
const fs = require('fs')
const exec = require("child_process").exec

// Indispensable au bon fonctionnent du site
app.enable("trust proxy") // Si l'ip est ::1 ça veut dire localhost
app.set("etag", false) // disable cache
app.use(express.static(__dirname + "/website")) 

// Dashboard

app.get("/", async (req, res) => {

    const users = bot.users.cache.size
    const guilds = bot.guilds.cache.size

    let file = fs.readFileSync("./website/html/index.html", { encoding: "utf-8"})
    file = file.replace("$$guilds$$", guilds)
    file = file.replace("$$users$$", users)


    res.send(file);
})
//Commands list
    const commands = exec('docker logs phpmyadmin', function (err,stdout, stderr){


    console.log(stdout.toString('utf8'))
});


// Logs messages
app.listen(process.env.PORT || 90, () => console.log(`🌐 | Admin panel sur http://localhost:90/`), console.log('🌐 | Admin panel correctement lancée'))


