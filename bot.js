var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var jokes = require('./jokes.json');
var comparison = "";
var len = 0;
var end = "";
var msg = "";
var index = 0;
var mute = false;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
		
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
				break;
			case 'hungry':
				bot.sendMessage({
					to: channelID,
					message: "Hi hungry, I'm dad!"
				});
				break;
			case 'joke':
				bot.sendMessage({
					to: channelID,
					message: jokes.joke[Math.floor(Math.random() * jokes.joke.length)]
				});
				break;
			case 'mute':
				mute = !mute;
				break;
         }
     }
	 
	comparison = message.toString().toLowerCase(); // Sets string to lower case
	comparison = comparison.replace("'", ""); // Removes apostrophes
	comparison = comparison.replace('"', ""); // Removes quotes
	len = message.length;
	end = message.substring(len - 1); //takes last letter of string
	
	if (comparison.indexOf('im ') >= 0){
		index = comparison.indexOf('im ');
		msg = comparison.substring(0, index);
		if(msg.length == 0)
		{
			comparison = " " + comparison; //adds space to beginning of message if otherwise blank
		}
	}
	if (comparison.indexOf('i am ') >= 0){
		index = comparison.indexOf('i am ');
		msg = comparison.substring(0, index);
		if(msg.length == 0)
		{
			comparison = " " + comparison; //adds space to beginning of message if otherwise blank
		}
	}
	
	
	if(comparison.indexOf(' im ') >= 0 || comparison.indexOf('i am') >= 0){
		while(end.charAt(0) == "!" || end.charAt(0) == "." || end.charAt(0) == "?" || end.charAt(0) == ',') //checks for end punctuation
		{
			message = message.slice(0,-1);
			len = message.length;
			end = message.substring(len - 1);
		}
		if(comparison.indexOf(' im ') >= 0){
			msg = message.substring(index + 3)
		}
		else if(comparison.indexOf(' i am ') >= 0){
			msg = message.substring(index + 5);
		}
		if(msg[0] == " ") //if msg begins with a space, removes it
		{
			msg = msg.substring(1);
		}
		if(user != "Dad-Bot" && !mute){
			bot.sendMessage({
				to: channelID,
				message: "Hi " + msg + ", I'm dad!"
				});
		}
	}

	response(message, 'ur mom gay', 'no u');
	response(message, 'no u', 'ur dad lesbian');
	response(message, 'ur dad lesbian', 'ur sister a mister');
	response(message, 'ur sister a mister', 'ur brother a mother');
	response(message, 'ur brother a mother', 'ur granny a tranny');
	response(message, 'ur granny a tranny', 'ur grandpap a trap');
	response(message, 'ur grandpap a trap', 'ur family tree LGBT');
	response(message, 'ur family tree lgbt', 'ur ancestors incestors');
	response(message, 'ur ancestors incestors', 'no u');
	
	function response(input, trigger, response){
		 if (input.toString().toLowerCase().indexOf(trigger) >= 0 && user != 'Dad-Bot' && !mute){
			bot.sendMessage({
				to: channelID,
				message: response
			});		 
		 }
	}

 });
 
