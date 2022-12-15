const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


exports.help = {
    name:"tempban"
}


exports.run = async (bot, message, args) => {
    if(message.member.permissions.has(['BAN_MEMBERS'])) {
        const NULL = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`**Action de modération**`)
        .setDescription(`⛔ - Mauvais usage de la commandes. (tempban <member> <time> <raison>)`)
        .setTimestamp()
        .setFooter({ text: config.client.name, iconURL: config.client.logo });

        let arg = message.content.trim().split(/ +/g);
        const user = message.mentions.users.first();
        const temps = arg[2];
        const raison = args.slice(2).join(" ");

        message.delete();

        if(!user) return message.channel.send({ embeds: [NULL] });
        if(!temps) return message.channel.send({ embeds: [NULL] });
        if(!raison) return message.channel.send({ embeds: [NULL] });

        const TEMPBAN = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('**Action de modération**')
        .addFields(
            { name: 'Pseudo', value: `${user}`},
            { name: 'Durée', value: `${temps} secondes`},
            { name: 'Raison', value: `${raison}`},
        )
        .setTimestamp()
        .setFooter({ text: config.client.name, iconURL: config.client.logo });

        message.channel.send({ embeds: [TEMPBAN] });

        user.send(`Vous avez été banni du serveur ${message.guild.name}. Par <@${message.author.id}>. Pour la durée de ${temps} secondes. pour la raison : ${raison}.`)

        await message.guild.members.ban(user);
        setTimeout(function(){
            message.guild.members.unban(user);
        }, temps*1000)
    } else {
        const NULL_PERMS = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('**Action de modération**')
        .setDescription(`⛔ - Tu n'as pas la permissions d'executer cette commandes.`)
        .setTimestamp()
        .setFooter({ text: config.client.name, iconURL: config.client.logo});

        message.delete()
        message.channel.send({ embeds: [NULL_PERMS] });
    }
}