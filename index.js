const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter( file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter( file => {file.endsWith('.js')});

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

for ( const file of eventFiles ){
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once){
        client.once(event.name, (...args) => event.execute(...args));
    }else {
        client.on(event.name, (...args) => {event.execute(...args)});
    }
}

client.once("ready", () => {
    console.log('Bot ready!!');    
});

client.on('interactionCreate', async interaction => {

    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) return;

    try{
        await command.execute(interaction);
    }catch(error){
        console.log(error);
        await interaction.reply({
            content: 'There was an error while execute the command!',
            ephemeral: true
        });
    }
});

client.login(token);
