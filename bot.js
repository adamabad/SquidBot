//Discord and tokens
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
global.client = new Discord.Client({partials: ['MESSAGE','REACTION']});
const Database = require("better-sqlite3");
const { SqliteError } = require('better-sqlite3');
global.db = new Database('./squidBase.db');
//global.userTable = new SQLite('./users.sqlite');
//global.summonTable = new SQLite('./summons.sqlite');
//global.raid_dataTable = new SQLite('./raidData.sqlite');
//global.raid_hostTable = new SQLite('./raid_host.sqlite');
//global.raid_aliasesTable = new SQLite('./raid_aliases.sqlite');

//Setting up Database
//Database		
//		const {Pool, Client} = require('pg');
//		const connectionString = 'posgressql://squidBot:squid@localhost:5432/squidbase';
		
//		global.thisClient = new Client({
//			connectionString:connectionString,
//		})
//		thisClient.connect();
				
//End Database connect

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.on(`message`, message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	console.log(Date(Date.now()) + " " + commandName + " " + message.author.username);
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	
	if(command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
	if(command.guildOnly && message.channel.type !== `text`) {
		return message.reply(`I cant execute that command inside DMs!`);
	}
	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 10) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
		command.execute(message, args);
	} 
	catch (error) {
		console.error(error);
		message.reply(`there was an error trying to execute that command T-T`);
	}
});

messageDAT = require('./data/messages.json'); 
global.roleMessage = messageDAT.roleMessage;

client.on('messageReactionAdd', async(reaction, user) =>{
	if(reaction.message.id == roleMessage && user.id != `637389949951410176`) {
		if(reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				console.log(`Something went wrong when fetching the message: `, error);
				return;
			}
		}
		var role;
		var roleArray = {'dragalia' : `635738937213845504`, 
						'orange' : `615275296631029781`, 
						'ubhl' : `575500375227105321`, 
						'minecraft' : `592173937883086871`,
						'prico' : `641871765852651520`,
						'skribblio' : `641872529740398603`,					
					};
		switch(reaction._emoji.name) {
			case `🐉`:
				role = "dragalia";
				break;
			case `🟠`:
				role = "orange";
				break;
			case `🦎`:
				role = "ubhl";
				break;
			case `⚔️`:
				role = "minecraft";
				break;
			case `👸`:
				role = "prico";
				break;
			case `📝`:
				role = "skribblio";
				break;
			default:
				role = 'err';
				reaction.remove();
				console.log(`Emote not found: `, reaction._emoji.name);
		}
		console.log(role);
		if(!role != `err`) {
			reaction.message.guild.members.fetch(user)
				.then(member => {	
					if(member._roles.includes(roleArray[role])) {
						console.log(`removing ${user.username} ` + role);
						member.roles.remove(roleArray[role]).catch(console.error);
					}
					else {
						console.log(`adding ${user.username} ` + role);
						member.roles.add(roleArray[role]).catch(console.error);
					}		
				});
			reaction.users.remove(user);
		}
	}
});

/*client.on(`voiceStateUpdate`, (oldMember, newMember) => {
	let newUserChannel = newMember.member.voiceChannel;
	let oldUserChannel = oldMember.member.voiceChannel;
	console.log(oldMember + " " + newMember);
	if(oldUserChannel === undefined && newUserChannel) {
		// entered voiceChannel
		removeChatroomroles();
		let role = oldMember.guild.roles.cache.find(role => role.name === 'vc');
		if(role && !newMember.member.roles.cache.has(role)) {
			newMember.member.roles.catche.add(role).catch(console.error);
			//newMember.addRole(role).catch(console.error);
		}
	}
	else if(oldUserChannel && newUserChannel && oldUserChannel.id != newUserChannel.id) {
		//Moved Voice Channels
		removeChatroomroles();
		let role = oldMember.guild.roles.cache.find(role => role.name === 'vc');
		if(role && !newMember.member.roles.cache.has(role)) {
			newMember.member.roles.catche.add(role).catch(console.error);
			//newMember.addRole(role).catch(console.error);
		}
	}
	else if(newUserChannel === undefined) {
		// user has left voice channel
		removeChatroomroles();
	}
	
	function removeChatroomroles() {
		let role = oldMember.guild.roles.cache.find(role => role.name === 'vc');
		if(oldMember.member.roles.cache.has(role)) {
			oldMember.member.roles.remove(role).catch(console.error);
		}
		//if((newMember != undefined && newMember.roles.has(r => r.name === `vc`)) || (oldMember != undefined && oldMember.roles.has(r => r.name === `vc`))) 
		//	newMember.roles.remove(role);
	}
});*/

const cooldowns = new Discord.Collection();
global.trainlist = {"grimnir":null};
global.ubhlCheck = false;
client.once('ready', () => {
	data = db.prepare(`SELECT * FROM striketimes WHERE server_id = 440680731568635915`).get();
	var CronJob = require('cron').CronJob;
	//data.rows[0].time_1 + `,` + data.rows[0].time_2
	//var job = new CronJob(`00 17 ` + data['st1'] + `,` + data['st2'] + ` * * *`, function() {
	var job = new CronJob(`00 00 ` + data['st1'] + `,` + data['st2'] + ` * * *`, function() {
		console.log('Strike Time');
		const channel = client.guilds.cache.get('440680731568635915').channels.cache.find(channel => channel.name === 'general');
		channel.send('Strike Time!');
	}, null, true, 'Asia/Tokyo');
	job.start();
	//if(!table['count(*)']) {
		/*db.prepare(`CREATE TABLE users (user_id TEXT, server_id TEXT);`).run();
		db.prepare(`CREATE TABLE raid_host (user_id TEXT, raid_id INTEGER);`).run();
		db.prepare(`CREATE TABLE raid_aliases (alias TEXT, raid_id INTEGER);`).run();
		db.prepare(`CREATE TABLE raid_data (raid_id INTEGER PRIMARY KEY, raid_name TEXT, level_unlocked INTEGER, image_url TEXT, host_material TEXT, wiki TEXT);`).run();
		db.prepare(`CREATE TABLE summons (user_id TEXT PRIMARY KEY, single_draws INTEGER, ten_draws INTEGER, crystals INTEGER);`).run();
		
		db.prepare(`CREATE TABLE striketimes (server_id TEXT PRIMARY KEY, st1 TEXT, st2 TEXT);`).run();
		//db.prepare(`INSERT into striketimes (server_id, st1, st2) VALUES ('440680731568635915','12','21')`).run();
		//db.prepare(`UPDATE striketimes SET st1 = 'striketime1', st2 = 'striketime2' WHERE server_id = '440680731568635915';`).run();
		//db.prepare(`INSERT INTO raid_aliases (alias, raid_id) VALUES ('levimal', 47)`).run();
		)
	//}*/
	//console.log(db.prepare(`SELECT * FROM raid_data;`).all());
	console.log('Ready!');
});

client.login(token);