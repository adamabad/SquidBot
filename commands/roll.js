module.exports = {
	name: 'roll',
	cooldown: 1,
	description: 'Dice Roll command $r #d##',
	aliases: ['roll'],
	execute(message, args) {
        if(args.length) {
            var re = /[0-9]+d[0-9]+/g;
            var die, textstring;
            textstring = ``; 
            if(re.test(args[0])) {
                die = args[0].split("d");
                if(die[0] > 50) {
                    return;
                }
                if(die[1] > 1000000) {
                    return;
                }
                for(x = 0; x < die[0]; x++) {
                    textstring = textstring + Math.floor(Math.random()*die[1] + 1) + "\n";
                }
                message.channel.send(textstring);
            }
            else {
                return;
            }
        }
    },
}