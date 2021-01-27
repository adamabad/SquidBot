module.exports = {
	name: 'bean',
	cooldown: 5,
	description: 'Bean sucks ass',
	execute(message, args) {
		const Discord = require(`discord.js`);
		var rand = Math.floor(Math.random() * (6) + 1);
		switch(rand) {
			case 1:
				message.channel.send(sendEmbeded('https://cdn.discordapp.com/attachments/539294436497031198/554838110953930753/Capture1.PNG',"Bean's Fire Grid","#ff0000"));
				break;
			case 2:
				message.channel.send(sendEmbeded(`https://cdn.discordapp.com/attachments/539294436497031198/554838073930678272/Capture3.PNG`,"Bean's Water Grid","#0000ff"));
				break;
			case 3:
				message.channel.send(sendEmbeded(`https://cdn.discordapp.com/attachments/539294436497031198/554838115903078401/Capture.PNG`,"Bean's Wind Grid","#1F82F1"));
				break;
			case 4:
				message.channel.send(sendEmbeded(`https://cdn.discordapp.com/attachments/539294436497031198/554838133716549663/Capture4.PNG`,"Bean's Dark Grid","#800080"));
				break;
			case 5:
				message.channel.send(sendEmbeded(`https://cdn.discordapp.com/attachments/539294436497031198/554838135188619284/Capture5.PNG`,"Bean's Light Grid","#FFD700"));
				break;
			default:
				message.channel.send(sendEmbeded(`https://cdn.discordapp.com/attachments/539294436497031198/554838135188619284/Capture5.PNG`,"Bean's Light Grid","#FFD700"));
				break;
		}
		function sendEmbeded(imglink, title, color) {
			const embeded = new Discord.MessageEmbed()
				.setColor(color)
				.setTitle(title)
				.setImage(imglink);
			return embeded;
		}
	},
};