module.exports = {
	name: 'pioche',
	description: 'Permet de piocher X cartes dans le deck.',
	execute(message, args) {
		message.channel.send('Vous ne pouvez pas encore piocher de carte mais on progresse !');
	},
};