const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, bot) {
        let antilink = ["https://", "http://"];
    
        antilink.forEach(async (word) => {
            if (message.content.toLowerCase().includes(word)) {
                const Embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription('Vous ne pouvez pas envoyer de liens')
                
                return message.delete() + message.reply({ embeds: [Embed] });
            }
        });
    }
}