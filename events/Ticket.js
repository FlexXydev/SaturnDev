const config = require('../config.json');
const mysql = require('mysql');
const { MessageSelectMenu, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

// Connexion BDD
const db = new mysql.createConnection({
  host: config.BDD.host,
  port: config.BDD.port,
  password: config.BDD.password,
  user: config.BDD.user,
  database: config.BDD.database
});

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
      db.query(`SELECT * FROM ticket WHERE guildId = "${interaction.guild.id}"`, async (err, req) => {
        const roles = req[0].roles;
        const category = req[0].category;
        const category_hautstaff = req[0].category_hautstaff;
        const category_staff = req[0].category_staff;
        const category_autres = req[0].category_autres;

        if(interaction.customId == "ticket-button"){
            interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                parent: category,
                topic: interaction.user.id,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                  },
                  {
                    id: roles,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                  },
                  {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                ],
                type: 'text',
            }).then(async c => {
                interaction.reply({
                  content: `Ticket créé! <#${c.id}>`,
                  ephemeral: true
                });
              
                const embed = new MessageEmbed()
                  .setColor('6d6ee8')
                  .setDescription('Séléctionnez la catégorie de votre ticket')
                  .setFooter({ text: config.client.name, iconURL: config.client.logo})
                  .setTimestamp();
              
                const row = new MessageActionRow()
                  .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('category')
                    .setPlaceholder('Séléctionnez la catégorie du ticket')
                    .addOptions([{
                        label: 'Haut Staff',
                        value: 'hstaff',
                        emoji: '🪙',
                      },
                      {
                        label: 'Staff',
                        value: 'staff',
                        emoji: '🎮',
                      },
                      {
                        label: 'Autres',
                        value: 'autre',
                        emoji: '📔',
                      },
                    ]),
                  );
                  
                msg = await c.send({
                  content: `<@!${interaction.user.id}> à ouvert un ticket !`,
                  embeds: [embed],
                  components: [row]
                });
                const collector = msg.createMessageComponentCollector({
                    componentType: 'SELECT_MENU',
                    time: 20000
                });
                collector.on('collect', i => {
                    if (i.user.id === interaction.user.id) {
                        if (msg.deletable) {
                            msg.delete().then(async () => {
                                const embed = new MessageEmbed()
                                    .setColor('6d6ee8')
                                    .setAuthor({ name: 'Ticket', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
                                    .setDescription(`<@!${interaction.user.id}> A créé un ticket ${i.values[0]}`)
                                    .setFooter({ text: config.client.name, iconURL: config.client.logo})
                                    .setTimestamp();
                            
                                const row = new MessageActionRow()
                                .addComponents(
                                new MessageButton()
                                .setCustomId('close-ticket')
                                .setLabel('Fermer le ticket')
                                .setEmoji('899745362137477181')
                                .setStyle('DANGER'),
                                );
                                
                                const opened = await c.send({
                                  content: `<@&${roles}>, <@!${interaction.user.id}> à ouvert un ticket !`,
                                  embeds: [embed],
                                  components: [row]
                                });
                              
                                opened.pin().then(() => {
                                  opened.channel.bulkDelete(1);
                                });
                            });
                        };
                        if (i.values[0] == 'hstaff') {
                          c.edit({
                            parent: category_hautstaff
                          });
                        };
                        if (i.values[0] == 'staff') {
                          c.edit({
                            parent: category_staff
                          });
                        };
                        if (i.values[0] == 'autre') {
                          c.edit({
                            parent: category_autres
                          });
                        };
                    };
                });
            })
        }
        if (interaction.customId == "close-ticket") {
            const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);
        
            const row = new MessageActionRow()
              .addComponents(
                new MessageButton()
                .setCustomId('confirm-close')
                .setLabel('Fermer le ticket')
                .setStyle('DANGER'),
                new MessageButton()
                .setCustomId('no')
                .setLabel('Annuler la fermeture')
                .setStyle('SECONDARY'),
              );
              
            const verif = await interaction.reply({
              content: 'Êtes vous sûr de vouloir fermer le ticket ?',
              components: [row]
            });
          
            const collector = interaction.channel.createMessageComponentCollector({
              componentType: 'BUTTON',
              time: 10000
            });
          
            collector.on('collect', i => {
              if (i.customId == 'confirm-close') {
                interaction.editReply({
                  content: `Ticket fermé par <@!${interaction.user.id}>`,
                  components: []
                });
              
                chan.edit({
                    name: `fermé-${chan.name}`,
                    permissionOverwrites: [
                      {
                        id: client.users.cache.get(chan.topic),
                        deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
                      {
                        id: roles,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
                      {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                      },
                    ],
                  })
                  .then(async () => {
                    const embed = new MessageEmbed()
                      .setColor('6d6ee8')
                      .setAuthor({ name: 'Ticket', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
                      .setDescription('```Contrôle des tickets```')
                      .setFooter({ text: config.client.name, iconURL: config.client.logo})
                      .setTimestamp();
                  
                    const row = new MessageActionRow()
                      .addComponents(
                        new MessageButton()
                        .setCustomId('delete-ticket')
                        .setLabel('Supprimer le ticket')
                        .setEmoji('🗑️')
                        .setStyle('DANGER'),
                      );
                      
                    chan.send({
                      embeds: [embed],
                      components: [row]
                    });
                  });
                
                collector.stop();
              };
              if (i.customId == 'no') {
                interaction.editReply({
                  content: 'Fermeture du ticket annulé !',
                  components: []
                });
                collector.stop();
              };
            });
          
            collector.on('end', (i) => {
              if (i.size < 1) {
                interaction.editReply({
                  content: 'Fermeture du ticket annulé !',
                  components: []
                });
              };
            });
        };
      
        if (interaction.customId == "delete-ticket") {
            const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);

            chan.edit({
              permissionOverwrites: [
                {
                  id: client.users.cache.get(chan.topic),
                  deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: roles,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
              ],
            })
        
            chan.send('Suppression du channel...');
        
            setTimeout(() => {
                chan.delete();
            }, 500);
        }
      })
    }
}