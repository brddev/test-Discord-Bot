const Discord = require('discord.js');

module.exports = async (client, interaction, args) {
    const Data = await suggestion.findOne({ GuildID: interaction.guild.id });
if  (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `You can't use this command!`, ephemeral: true });

            if (Data) {
                const channel = client.channels.cache.get(Data.ChannelID);
                return await interaction.reply({ content: `You already have a suggestion system **setup** in ${channel}!`, ephemeral: true });
            } else {

                await suggestion.create({
                    GuildID: interaction.guild.id,
                    ChannelID: Schannel.id
                })
                
                const embed = new EmbedBuilder()
                .setColor('Green')
                .setAuthor({ name: `${interaction.guild.name}'s Suggestion System`})
                .setTitle('Success!')
                .setDescription(`The suggestion system has been successfully **setup** in ${Schannel}!`)

                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
