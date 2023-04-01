import joinVoiceChannel from "@discordjs/voice";

class Connection{
    channel;
    connection;

    setChannel = function(channelId, client){
        this.channel = client.channels.cache.get(channelId);
    };

    setConnection = function(){
        this.connection = joinVoiceChannel({
            channelId: this.channel.id,
            guildId: this.channel.guild.id, 
            adapterCreator: this.channel.guild.voiceAdapterCreator,
        })
    };

    getConnection = function(){
        return this.connection;
    }

    getChannel = function(){
        return this.channel;
    }
}

module.exports = Connection;