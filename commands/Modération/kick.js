exports.help = {
    name:"kick"
}

exports.run = async (bot, message, args) => {
    if(message.member.permissions.has(['KICK_MEMBERS'])){
        user = message.mentions.users.first();
        let raison = args.slice(1).join(" ");

        message.delete();
        if(!user) return message.channel.send(`⛔ - Mauvais usage de la commandes. (kick <member> <raison>)`);
        if(!raison) return message.channel.send(`⛔ - Mauvais usage de la commandes. (kick <member> <raison>)`);

        user.send(`Vous avez été kick du serveur ${message.guild.name} par <@${message.author.id}> pour la raison : ${raison}`)

        await message.channel.send(`Le member ${user} à été kick du serveur.\nRaison : ${raison}\nPar : ${message.author.username}`)
        await message.guild.members.kick(user, {reason: raison});
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