// Infos
exports.help = {
    name:"userinfo"
}


exports.run = async (bot, message) => {
    const username = message.mentions.users.first()
    if(username) {
        user = username;
    } else {
        user = message.author;
    }
    const member = message.mentions.users.first() || message.author;

    message.delete({ timeout: 100 })
    message.channel.send(`- ID du membre : ${user.id}.\n- Pseudo sur le serveur : ${member.nickname ? member.nickname : user.username}.\n- Dates de création du compte : ${user.createdAt.toLocaleDateString('en-GB')}.`)
}