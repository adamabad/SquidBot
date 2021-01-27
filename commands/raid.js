module.exports = {
	name: 'raid',
	cooldown: 1,
	description: 'Assign Raids or ping raids for others',
	aliases: ['r'],
	execute(message, args) {
		
		const Discord = require('discord.js');
		//console.log(message.channel_id);
		
		//Checks local translation and assigns the table name to the raidName or sets the arg to undefined
		if(args.length) {
			if(args[0] == `set` || args[0] == `s` || args[0] == `add` || args[0] == `a`) {
				//set raid
                args.shift();			
				//Check to see if user is in the table
                data = db.prepare(`SELECT count(*) FROM users WHERE user_id = ` + message.member.id + ` AND server_id = `+ message.guild.id +`;`).get();
				if(!data[`count(*)`]) { //Check if user is in the table
					db.prepare(`INSERT INTO users(user_id, server_id) VALUES(`+ message.member.id +`,`+ message.guild.id +`);`).run();
                }
                thisname = getName();
                nameCheck = db.prepare(`SELECT count(*) FROM raid_aliases WHERE alias = '`+ escape(thisName) +`';`).get();
                if(nameCheck['count(*)'] >= 1) {
                    check = db.prepare(`SELECT count(*) FROM raid_host WHERE user_id = ` + message.member.id + ` AND raid_id = (SELECT raid_id FROM raid_aliases WHERE alias = '`+ escape(thisName) +`');`).get();
                    if(!check['count(*)']) {
                        db.prepare(`INSERT INTO raid_host(user_id, raid_id) VALUES(`+ message.member.id +`, (SELECT raid_id FROM raid_aliases WHERE alias = '`+ escape(thisName) +`'));`).run();
                        message.react('✅');
                    }                
                    else {
                        message.reply('You are already in that raid.')
                    }
                }
                else {
                    message.reply('Couldn\'t find the raid.');
                }
			}
			else if(args[0] == `remove` || args[0] == `rm`) {
                //Remove raid
                args.shift();
                thisname = getName();
                nameCheck = db.prepare(`SELECT count(*) FROM raid_aliases WHERE alias = '`+ escape(thisName) +`';`).get();
                if(nameCheck['count(*)'] >= 1) {
                    db.prepare(`DELETE FROM raid_host WHERE user_id = `+ message.member.id +` AND raid_id = (SELECT raid_id FROM raid_aliases WHERE alias = '` + escape(thisName) + `')`).run();
                    message.react('❌');
                }
                else {
                    message.reply('Couldn\'t find the raid');
                }
            }
            else if(args[0] == `info`) {
                args.shift();
                thisname = getName();
                nameCheck = db.prepare(`SELECT count(*) FROM raid_aliases WHERE alias = '`+ escape(thisName) +`';`).get();
                if(nameCheck['count(*)'] >= 1) {
                    data = db.prepare(`SELECT * FROM raid_data WHERE raid_id = (SELECT raid_id FROM raid_aliases WHERE alias = '` + escape(thisName) + `')`).get();
                    //console.log(data);    
                    if(!data['raid_id']) {
                        message.reply(`Raid not found.`);
                        return;
                    }
                    const embeded = new Discord.MessageEmbed()
                        .setTitle(data['raid_name'])
                        .setThumbnail(data['image_url'])
                        .setURL(data['wiki'])
                        .addFields(
                            {name: 'Minimum Level: ', value: data['level_unlocked'] + "+"},
                            {name: 'Host Material', value: data['host_material']},
                        )
                    message.channel.send(embeded);
                }
                else {
                    message.reply('Couldn\'t find the raid');
                }
            }
            else {
                //ping raid
                thisname = getName();
                nameCheck = db.prepare(`SELECT count(*) FROM raid_aliases WHERE alias = '`+ escape(thisName) +`';`).get();
                if(nameCheck['count(*)'] >= 1) {
                    data = db.prepare(`SELECT * FROM raid_data WHERE raid_id = (SELECT raid_id FROM raid_aliases WHERE alias = '` + escape(thisName) + `')`).get();
                    users = db.prepare(`SELECT * FROM raid_host LEFT JOIN users ON raid_host.user_id = users.user_id WHERE raid_id = ` + data['raid_id'] + ` AND server_id = ` + message.guild.id);
                    textstring = "";
                    for(const user of users.iterate()) {
                        if(Array.from(message.channel.members.keys()).indexOf(user['user_id']) != undefined) {
                            textstring = textstring +  "<@" + user['user_id'] + "> ";
                        }
                    }
                    if(textstring != "") { 
                        message.channel.send(textstring);
                    }
                    Personname = message.member.nickname;
                    if(Personname == null) {
                        Personname = message.author.username;
                    }
                    const embeded = new Discord.MessageEmbed()
                        .setTitle(Personname + ` is hosting ` + data["raid_name"])
                        .setImage(data["image_url"])
                        message.channel.send(embeded);
                    } //Ping \
                    else {
                        message.reply('Couldn\'t find the raid');
                    }
            }   
		} //End length if			
		else {
			message.reply(`$raids follows the following format: $(r)raid [options: (s)set, (rm)remove] [raid name]`);
        }
        
        function getName() {
            thisName = undefined;
            for(var x = 0; x < args.length; x++) {
                if(thisName == undefined) {
                    thisName = args[x];
                }
                else {
                    thisName = thisName + " " + args[x];
                };
            }
            thisName = thisName.toLowerCase();
        }
	},
};