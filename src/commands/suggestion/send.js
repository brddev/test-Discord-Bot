const Discord = require('discord.js');
const suggestion = require("../../database/models/suggestionChannels");
const formatResults = require('../../handlers/functions/formatResults');

module.exports = async (client,interaction,args) => {
        const Data = await suggestion.findOne({ Guild: interaction.guild.id });
    if (Data) {

        const suggestmsg = interaction.options.getString('suggestion');
        const suggestionchannel = interaction.guild.channels.cache.get(Data.Channel);

        client.succNormal({
                text: `Suggestion successfully submitted!`,
                fields: [
                    {
                        name: `💬┇Suggestion`,
                        value: `${suggestmsg}`,
                        inline: true
                    },
                    {
                        name: `📘┇Channel`,
                        value: `<#${Data.Channel}>`,
                        inline: true
                    }
                ],
                type: 'editReply'
            }, interaction);
        
       const num1 = Math.floor(Math.random() * 256);
       const num2 = Math.floor(Math.random() * 256);
       const num3 = Math.floor(Math.random() * 256);
       const num4 = Math.floor(Math.random() * 256);
       const num5 = Math.floor(Math.random() * 256);
       const num6 = Math.floor(Math.random() * 256);
       const SuggestionID = `${num1}${num2}${num3}${num4}${num5}${num6}`;
        
       const suggestionembed = new Discord.EmbedBuilder()
        .setAuthor({ name: `New Suggestion - ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
                .setColor(client.config.colors.normal)
              .setThumbnail(interaction.guild.iconURL({ size: 512, dynamic: true }))
                .setTitle(`Suggestion from ${interaction.user.username}`)
                .setDescription(`> \`${suggestmsg}\``)
                .setTimestamp()
                .setFooter({ text: `Suggestion ID: ${SuggestionID}`,iconURL: client.user.avatarURL() })
                .addFields({ name: 'Upvotes', value: '> **No votes**', inline: true })
                .addFields({ name: 'Downvotes', value: '> **No votes**', inline: true })
                .addFields({ name: 'Author', value: `> ${interaction.user}`, inline: false })
                .addFields({ name: `Votes`, value: formatResults() })

                const upvotebutton = new Discord.ButtonBuilder()
                .setCustomId('upv')
                .setEmoji("👍")
                .setLabel('Upvote')
                .setStyle(Discord.ButtonStyle.Primary)

                const downvotebutton = new Discord.ButtonBuilder()
                .setCustomId('downv')
                .setEmoji("👎")
                .setLabel('Downvote')
                .setStyle(Discord.ButtonStyle.Primary)
        
                const totalvotesbutton = new Discord.ButtonBuilder()
                .setCustomId('totalvotes')
                .setEmoji('📊')
                .setLabel('Who Voted')
                .setStyle(Discord.ButtonStyle.Secondary)

                const btnrow = new Discord.ActionRowBuilder().addComponents(upvotebutton, downvotebutton, totalvotesbutton);
        
                const button2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId('appr')
                    .setLabel('Approve')
                    .setEmoji('✅')
                    .setStyle(Discord.ButtonStyle.Success),

                    new Discord.ButtonBuilder()
                    .setCustomId('rej')
                    .setEmoji('❎')
                    .setLabel('Reject')
                    .setStyle(Discord.ButtonStyle.Danger)
                );
                const msg = await suggestionchannel.send({ embeds: [suggestionembed], components: [btnrow, button2] });
                msg.createMessageComponentCollector();

                await suggestion.create({
                    Guild: interaction.guild.id,
                    Channel: suggestionchannel.id,
                    Msg: msg.id,
                    AuthorID: interaction.user.id,
                    upvotes: 0,
                    downvotes: 0,
                    Upmembers: [],
                    Downmembers: []
                })
            } else {
      client.errNormal({
         error: `No suggestion channel set! Please do the setup`,
        type: 'editreply'
      }, interaction); 
   }
}
