module.exports = {
    name: 'sparkset',
    cooldown: 5,
	aliases: ['spark'],
    description: 'Sets your current spark',
	execute(message, args) {
		const Discord = require('discord.js');
		if(args[0] == 'set') {
			//set spark
			args.shift();
			if(args.length != 1) {
				message.channel.send('Error: Invalid Input');
				return;
			}
			inString = args[0].split(/[;,:/]/, 3);
			var crystal, tendraw, singledraw, draws;
			crystal = parseInt(inString[0]);
			singledraw = parseInt(inString[1]);
			tendraw = parseInt(inString[2]);
			draws = Math.floor(crystal/300) + (tendraw*10) + singledraw;
			user = db.prepare(`SELECT count(*) FROM summons WHERE user_id = ` + message.member.id + `;`).get();
			if(!user['count(*)']) {
				db.prepare(`INSERT INTO summons(user_id, ten_draws, crystals, single_draws) VALUES(` + message.member.id +`, ` + tendraw + `, ` + crystal + `, ` + singledraw +`);`).run();
				crystaldiff = crystal;
				tendiff = tendraw;
				singlediff = singledraw;
				progstring = Math.trunc(draws * 100 / 300) + '% (' + draws + '/300)';
				const embeded = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Spark Updated')
					.setThumbnail(message.member.user.avatarURL())
					.addFields (
						{name: 'Crystals', value: crystal + ` (` + (crystaldiff<0?"":"+") + crystaldiff + `)`, inline: true},
						{name: 'Tickets', value: singledraw + ` (` + (singlediff<0?"":"+") + singlediff + `)`, inline: true},
						{name: 'Ten-Part Tickets', value: tendraw + ` (` +(tendiff<0?"":"+") + tendiff + `)`, inline: true},
						{name: 'Progress', value: progstring},
					)
				message.channel.send(embeded);
			}
			else {
				user = db.prepare(`SELECT * FROM summons WHERE user_id = ` + message.member.id + `;`).get();
				db.prepare(`UPDATE summons SET ten_draws = ` + tendraw + `, crystals = ` + crystal + `, single_draws = ` + singledraw + ` WHERE user_id = ` + message.member.id).run();
				tendiff = tendraw - user['ten_draws'];
				crystaldiff = crystal - user['crystals'];
				singlediff = singledraw - user['single_draws']; 
				draws = Math.floor(crystal/300) + (tendraw*10) + singledraw;
				progstring = Math.trunc(draws * 100 / 300) + '% (' + draws + '/300)';
				const embeded = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Spark Updated')
					.setThumbnail(message.member.user.avatarURL())
					.addFields (
						{name: 'Crystals', value: crystal + ` (` + (crystaldiff<0?"":"+") + crystaldiff + `)`, inline: true},
						{name: 'Tickets', value: singledraw + ` (` + (singlediff<0?"":"+") + singlediff + `)`, inline: true},
						{name: 'Ten-Part Tickets', value: tendraw + ` (` +(tendiff<0?"":"+") + tendiff + `)`, inline: true},
						{name: 'Progress', value: progstring},
					)
				message.channel.send(embeded);
			}
		}
		else {
			user = db.prepare(`SELECT *, count(*) FROM summons WHERE user_id = ` + message.member.id).get();
			if(!user['count(*)']) {
				db.prepare(`INSERT INTO summons (user_id, ten_draws, crystals, single_draws) VALUES(` + message.member.id +`, ` + 0 + `, ` + 0 + `, ` + 0 +`);`).run();
				tendraw = 0;
				singledraw = 0;
				crystal = 0;
			}
			else {
				tendraw = user['ten_draws'];
				singledraw = user['single_draws'];
				crystal = user['crystals'];
			}

			draws = Math.floor(crystal/300) + (tendraw*10) + singledraw;
			progstring = Math.trunc(draws * 100 / 300) + '% (' + draws + '/300)';
			Personname = message.member.nickname;
			if(Personname == null) {
				Personname = message.author.username;
			}
			const embeded = new Discord.MessageEmbed()
				.setTitle(Personname + '\'s spark')
				.setThumbnail(message.member.user.avatarURL())
				.addFields (
					{name: 'Crystals', value: crystal, inline: true},
					{name: 'Tickets', value: singledraw, inline: true},
					{name: 'Ten-Part Tickets', value: tendraw, inline: true},
					{name: 'Progress', value: progstring},
				)
			message.channel.send(embeded);
		}
    },
};