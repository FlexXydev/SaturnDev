const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const mysql = require('mysql');


// Connexion BDD
const connection = new mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});

// Infos
exports.help = {
    name:"config"
}


exports.run = async (bot, message, args) => {
    if (message.member.permissions.has(['ADMINISTRATOR'] || [])) {
        let arg = message.content.trim().split(/ +/g)

        if (!arg[1]){
            const ARG1 = new MessageEmbed()
	            .setColor('#0099ff')
	            .setTitle('🔧 Configuration')
                .addFields(
                    { name: '🔧 - Général', value: '`prefix`  -  `suggest`' },
                    { name: '📩 - Ticket', value: '`channel-ticket`  -  `category`  -  `category-hautstaff`  -  `category-staff`  -  `category-autres`  -  `roles-ticket`' },
                )
	            .setTimestamp()
	            .setFooter({ text: config.client.name, iconURL: config.client.logo});

            message.delete({ timeout: 100});
            message.channel.send({ embeds: [ARG1] });

        } else if (arg[1] == "channel-ticket"){
            if(!arg[2]){

                const NULL_TICKET = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer l'ID d'un salons.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_TICKET] });
            } else {
                const TICKET = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`Le salon "${arg[2]}" à bien été sauvegardé comme salons de ticket !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [TICKET] });

                

            connection.query(`UPDATE ticket SET channel_ticket = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

                
                connection.end(
                    console.log('Deconnection db effectué')
                )
            }
        } else if (arg[1] == "category-hautstaff"){
            if(!arg[2]){

                const NULL_CATEGORYHS = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer l'ID d'une catégorie.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORYHS] });
            } else {
                const CATEGORYHS = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`La catégorie "${arg[2]}" à bien été sauvegardé comme catégorie de ticket haut staff !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORYHS] });

                

                connection.query(`UPDATE ticket SET category_hautstaff = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

            }
        } else if (arg[1] == "category-staff"){
            if(!arg[2]){

                const NULL_CATEGORYSTAFF = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer l'ID d'une catégorie.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORYSTAFF] });
            } else {
                const CATEGORYSTAFF = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`La catégorie "${arg[2]}" à bien été sauvegardé comme catégorie de ticket staff !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORYSTAFF] });

                

                connection.query(`UPDATE ticket SET category_staff = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

            }
        } else if (arg[1] == "category-autres"){
            if(!arg[2]){

                const NULL_CATEGORYAUTRES = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer l'ID d'une catégorie.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORYAUTRES] });
            } else {
                const CATEGORYAUTRES = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`La catégorie "${arg[2]}" à bien été sauvegardé comme catégorie de ticket autres !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORYAUTRES] });

                

                connection.query(`UPDATE ticket SET category_autres = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

            }
        } else if (arg[1] == "roles-ticket"){
            if(!arg[2]){

                const NULL_ROLES = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer l'ID d'un roles.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_ROLES] });
            } else {
                const ROLES = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`Le roles "${arg[2]}" à bien été sauvegardé comme grades du support ticket !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [ROLES] });

                

                connection.query(`UPDATE ticket SET roles = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

            }
        } else if (arg[1] == "category"){
            if(!arg[2]){

                const NULL_CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer l'ID d'une catégorie.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORY] });
            } else {
                const CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`La catégorie "${arg[2]}" à bien été sauvegardé catégorie de ticket !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORY] });

                

                connection.query(`UPDATE ticket SET category = '${arg[2]}' WHERE guildId = ${message.guild.id}`)


            }
        } else if (arg[1] == "prefix"){
            if(!arg[2]){

                const NULL_CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer un prefix.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORY] });
            } else {
                const CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`"${arg[2]}" à bien été sauvegardé comme prefix !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORY] });

                

                connection.query(`UPDATE guildconfigurable SET cmdPrefix = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

            }
        } else if (arg[1] == "logs"){
            if(!arg[2]){

                const NULL_CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer un salons de logs.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORY] });
            } else {
                const CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`"${arg[2]}" à bien été sauvegardé comme salons de logs !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORY] });

                

                connection.query(`UPDATE guildconfigurable SET logs = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

                
                


            }
        } else if (arg[1] == "suggest"){
            if(!arg[2]){

                const NULL_CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer un salons de suggestions.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORY] });
            } else {
                const CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`"${arg[2]}" à bien été sauvegardé comme salons de suggestions !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORY] });

                

                connection.query(`UPDATE guildconfigurable SET suggest = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

                
                
            }
        } else if (arg[1] == "bvn"){
            if(!arg[2]){

                const NULL_CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer un salons de bienvenue.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORY] });
            } else {
                const CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`"${arg[2]}" à bien été sauvegardé comme salons de bienvenue !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORY] });

                

                connection.query(`UPDATE guildconfigurable SET bienvenue = '${arg[2]}' WHERE guildId = ${message.guild.id}`)

                
                
            }
        } else if (arg[1] == "quit"){
            if(!arg[2]){

                const NULL_CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription("Vous devez indiquer un salons de aurevoir.")
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [NULL_CATEGORY] });
            } else {
                const CATEGORY = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle('🔧 Configuration')
	                .setDescription(`"${arg[2]}" à bien été sauvegardé comme salons de aurevoir !`)
	                .setTimestamp()
	                .setFooter({ text: config.client.name, iconURL: config.client.logo});

                message.delete({ timeout: 100});
                message.channel.send({ embeds: [CATEGORY] });

                connection.query(`UPDATE guildconfigurable SET quit = '${arg[2]}' WHERE guildId = ${message.guild.id}`)
     
            }
        }
    } else {
        const NULL_PERMS = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('🔧 Configuration')
	        .setDescription(`⛔ - Tu n'as pas la permissions d'executer cette commandes.`)
	        .setTimestamp()
	        .setFooter({ text: config.client.name, iconURL: config.client.logo});

        message.channel.send({ embeds: [NULL_PERMS] });
    }
}