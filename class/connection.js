const { joinVoiceChannel } = require ('@discordjs/voice');

class Connection {

    channel;
    connection;

    constructor(channelId = '', client = ''){
        this.channel = client.channels.cache.get(channelId);
    };

    connect(){
        this.connection = joinVoiceChannel({
            channelId: this.channel.id,
            guildId: this.channel.guild.id,
            adapterCreator: this.channel.guild.voiceAdapterCreator,
        });

        return this.connection;
    }

    getGuildId(){
        return this.connection.guildId;
    }
}

module.exports = {
    Connection: Connection
};