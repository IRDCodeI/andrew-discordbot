const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');
const { createAudioResource } = require('@discordjs/voice');
const { player } = require('../class/player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play youtube song'),
    
    async execute(interaction){
        playSong(interaction.client);
        await interaction.reply('Playing song');
    },
}

function playSong(client){

    let resource = createAudioResource(join(`${process.cwd()}/music`, 'track.mp3'));

    player.play(resource);
}