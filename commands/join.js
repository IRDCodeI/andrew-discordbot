const { SlashCommandBuilder } = require('discord.js');
const { Connection } = require('../class/connection');
const { player } = require('../class/player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join into a channel voice'),

    async execute(interaction) {

        let connection = new Connection('841875286786179088', interaction.client);
        connection = connection.connect();

        connection.subscribe(player);

        await interaction.reply(`Joined into a channel`);
    },
}
