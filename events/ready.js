const config = require('../config.json');
const discordjs = require('discord.js')


module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        // Login message
        console.log(`✅ | Connectés à ${bot.user.username}`)
        console.log(`🤖 | Le bot est utilisé sur ${bot.guilds.cache.size} serveurs !`)

        // Presence boucle 3 min    
        let currentActivity = 0;
        let maxActivity = 1;

    setInterval(async () => {
        currentActivity++;
        if (currentActivity > maxActivity) {currentActivity = 0};
        switch(currentActivity) {
            case 0:
                bot.user.setActivity(config.client.activityfr)
                console.log('👍 | Activité changé en Français')
                break;
            case 1:
                bot.user.setActivity(config.client.activityen)
                console.log('👍 | Activité changé en Anglais')
                break;
        };
    }, 30000);
    }
    }
