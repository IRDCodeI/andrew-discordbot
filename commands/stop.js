const { SlashCommandBuilder } = require('discord.js');
const { player } = require('../class/player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the current song.'),

    async execute(interaction){
        player.stop();
        await interaction.reply('Stopping the music.');
    }
}