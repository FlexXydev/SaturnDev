exports.help = {
    name:"clear"
}

exports.run = async (bot, message, args) => {
    if(message.member.permissions.has(['MANAGE_MESSAGES'])){
        message.delete();

        if(args[0] >= 1 && args[0] <= 100){
            message.channel.bulkDelete(args[0]);

            message.channel.send(`Clear de ${args[0]} messages !`);
        } else {
            message.channel.send(`⛔ - Tu n'as pas spécifier un nombre entre 1 & 99 !`)
        }
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