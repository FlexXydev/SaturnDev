const config = require('../config.json');
const discordjs = require('discord.js');
let now = new Date();


module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        // Login message
        console.log(`✅ | Connectés à ${bot.user.username}`)
        console.log(`🤖 | Le bot est utilisé sur ${bot.guilds.cache.size} serveurs !`)

        // Activité temporaire
        console.log('⏱ | Les activtés sont entrains de charger. Lancement du status temporaire')
        bot.user.setPresence({ activities: [{ name: config.client.activity, type: 'WATCHING'}], status: 'dnd'})

        // Activité boucle 30s   
        let currentActivity = 0;
        let maxActivity = 1;
    
    setInterval(async () => {
        currentActivity++;
        if (currentActivity > maxActivity) {currentActivity = 0};
        switch(currentActivity) {
            case 0:
                console.log('👍 | Activité changé en Français')
                bot.user.setActivity(config.client.activityfr)
                break;
            case 1:
                console.log('👍 | Activité changé en Anglais')
                bot.user.setActivity(config.client.activityen)
                break;
        };
    }, 30000);

    setInterval(function() {
        console.log("❗ | Le bot va être déconnecter car ça fais 10 minutes que le bot est lançé");
      }, 574800);
      
    }
    }

