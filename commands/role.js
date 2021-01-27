module.exports = {
	name: 'role',
	cooldown: 5,
	description: 'Gives Roles To Person \'$role [rm] <rolename>\'\nUse $role list for a full list of supported roles.',
	aliases: ['role'],
	execute(message, args) {
		const Discord = require('discord.js');
		var remove = false;
		if(!args.length) {
			message.reply(`Command requires a role to be added`);
			return;
		}
		if(args[0] === `rm` || args[0] === 'r' || args[0] === 'remove') {
			remove = true;
			args.shift();
		}
		
		var name = getName();
		var role;
		var role = {	'dragalia' : `635738937213845504`,
						'dgl' : `635738937213845504`, 
						
						'orange' : `615275296631029781`, 
						
						'ubhl' : `575500375227105321`, 
						
						'minecraft' : `592173937883086871`,
						'mc' : `592173937883086871`,
						
						'prico' : `641871765852651520`,
						'princess connect' : `641871765852651520`,
						'priconne' : `641871765852651520`,

						'skribblio' : `641872529740398603`,	

						'vrchat' : `754984201178185748`,

						'amongus' : `751758266459226182`,
						'among us' : `751758266459226182`,

						'bandori' : `713319550871011388`,

						'terraria' : `713319469673349160`,

						'animal crossing' : `703096336941056051`,
						'animalcrossing' : `703096336941056051`,

						'luci bois' : `702002666888495247`,
						'luci' : `702002666888495247`,

						'bubs babes' : `714351071476056136`,
						'bubz babes' : `714351071476056136`,
						'beelzebub' : `714351071476056136`,
						'bubs' : `714351071476056136`,	
						'bubz' : `714351071476056136`,	
						
						'genshin impact' : `798402474440130560`,
						'genshin' : `798402474440130560`,

						'arknights' : `798402478126530570`,

						'warframe' : `802638494165106708`,

						'direct strike' : `801275806574706729`,
						'directstrike' : `801275806574706729`,
						'ds' : `801275806574706729`,
					};
		/*switch(name) {
			case 'dragalia':
			case 'dgl':
				role = '635738937213845504';
				break;
			case 'ubhl':
				role = `575500375227105321`;
				break;
			case 'mc':
			case 'minecraft':
				role = `592173937883086871`;
				break;
			case 'oj':
			case '100oj':
			case '100%':
			case 'orange juice':
			case '100% orange juice':
				role = `615275296631029781`;
				break;
			case 'prico':
			case 'princess connect':
			case 'priconne':
				role = `641871765852651520`;
				break;
			case 'skribblio':
				role = `641872529740398603`;
				break;
			case 'vrchat':
				role = `754984201178185748`;
				break;
			case 'amongus':
				role = `751758266459226182`;
				break;
			case 'bandori':
				role = `713319550871011388`;
				break;
			case 'terraria':
				role = `713319469673349160`;
				break;
			case 'animal crossing':
				role = `703096336941056051`;
				break;
			case 'luci bois':
				role = `702002666888495247`;
				break;
			case 'bubs babes':
				role = `714351071476056136`;
				break;
			case 'list':
				showlist();
				return;
			default:
				message.reply(`Unable to locate role.`);
				return;

		}*/
		if(name === `list`) {
			showlist();
			return;
		}
		if(role[name] === undefined) {
			message.reply(`Unable to locate role.`);
			return;
		}
		if(remove) {
			if(message.member._roles.includes(role[name])) {
				message.member.roles.remove(role[name]).catch(console.error);
				message.reply(`Removed you from the ` + name + ` role`);
			}
			else {
				message.reply(`You currently do not have ` + name + ` role`);
			}
		}
		else {
			if(!message.member._roles.includes(role[name])) {
				message.member.roles.add(role[name]).catch(console.error);
				message.reply(`Gave you the ` + name + ` role`); 
			}
			else {
				message.reply(`You currently already have ` + name + ` role`);
			}
		}
		
		function showlist() {
			const embeded = new Discord.MessageEmbed()
						.setTitle(`Available Roles`)
						.setColor('#FFAB99')
                        .addField('Game Roles', ' 100% Orange Juice\n Among Us\n Animal Crossing\n Arknights\n Bandori\n Direct Strike\n Dragalia Lost\n Genshin Impact\n Minecraft\n Princess Connect\n Skribblio\n Terraria\n VRChat\n Warframe\n', true)
						.addField('Granblue Roles', '  Bubs Babes\n Luci Bois\n UbHL\n ', true);
			message.channel.send(embeded);	
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
            return thisName;
        }
	},
	
};