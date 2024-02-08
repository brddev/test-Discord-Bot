const Discord = require('discord.js');

module.exports = async (client, interaction, args) {
    const Data = await suggestion.findOne({ GuildID: interaction.guild.id });
if  (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `You can't use this command!`, ephemeral: true });

            if (!Data) {
                return await interaction.reply({ content: `You don't have a suggestion system **setup**!`, ephemeral: true });
            } else {
                await suggestion.deleteMany({
                    GuildID: interaction.guild.id
                }
                const embed = new EmbedBuilder()
                .setColor('Green')
                .setAuthor({ name: `${interaction.guild.name}'s Suggestion System`})
                .setTitle('Success!')
                .setDescription(`The suggestion system has been successfully **disabled**!`)

                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
