const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// Instanciation du client Discord
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Chargement des commandes dans le client
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Log startup
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

    // Si le message n'a pas le préfixe on n'effectue aucune action
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Récupération des arguments et de la commande
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Si le client ne connaît pas la commande on n'effectue aucune action
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Erreur lors de l\'exécution de la commande');
    }
});

client.login(token);