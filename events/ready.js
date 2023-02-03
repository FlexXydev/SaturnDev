const config = require('../config.json');
let now = new Date();


module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        // Login message
        console.log(`✅ | Connectés à ${bot.user.username}`)

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
    console.log("🌐 | Phpmyadmin on http://localhost:80/ | Username: root Password: root")
    }
    }
