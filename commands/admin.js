module.exports = {
	name: 'admin',
	cooldown: 10,
	description: 'Set of Admin commands to change bot behavior',
	aliases: ['rebuild'],
	execute(message, args) {
        console.log("admin called");
		if(message.member._roles.includes('539190910534156308')) {
            if(!args.length) {
                return;
            }
            switch(args[0]) {
                case 'striketime':
                    args.shift();
                    changeStrikeTime();
                    message.channel.send('Strike Times Changed');
                    break;
                default:
                    break;
            }
        }
        function changeStrikeTime() {
            st1 = args[0];
            st2 = args[1];
            if(Number.isInteger(st1) && Number.isInteger(st2) && st1 >= 0 && st1 < st2 && st2 <= 24) {
                db.prepare(`UPDATE striketimes SET st1 = '`+ st1 +`', st2 = '`+ st2 +`' WHERE server_id = '440680731568635915';`).run();
            }
        }
    },
};