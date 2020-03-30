var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var Help = require('./components/Help');
var Prices = require('./components/Prices');
var Port = require('./components/Port');
var Island = require('./components/Island');
var Dodo = require('./components/Dodo');

const DatabaseService = require('./services/DatabaseService');
const TimeService = require('./services/TimeService');

const low = require('lowdb')
const saturday = 6;
const sunday = 0;

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ neighbors: [] })
  .write()

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
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
    if (message.substring(0, 1) == '$') {
        let args = message.substring(1).split(' ');
        let cmd = args[0] ? args[0].toLowerCase() : 'nope';
        let request = args[1] ? args[1] : '';
        let today = new Date();
        let weekend = false;
        
        let userExists = (db.get('neighbors').find({ id: userID }).value() !== undefined);
        
        if(today.getDay() == sunday) weekend = true;
        // if(today.getDay() == saturday || today.getDay() == sunday) weekend = true;    
        args = args.splice(1);
        
        switch(cmd){
            case 'help':
                Help.All(bot, channelID);
            break;
            case 'price':
            case 'prices':
            case 'stonks':
            case 'stalks':
            case 'stalnks':
            case 'tendies':
            case 'stocks':
                Prices.Today(weekend, request, userExists, userID, user, db, bot, channelID);
            break;
            case 'mybodyisready':
                request = "opened";
            case 'port':
                Port.Status(weekend, request, userExists, userID, user, db, bot, channelID);
            break;
            case 'island':
                Island.Name(weekend, request, userExists, userID, user, db, bot, channelID);
            break;
            case 'dodo':
            case 'code':
            case 'dodocode':
                Dodo.Code(weekend, request, userExists, userID, user, db, bot, channelID);
            break;
            case 'timezone':
                TimeService.handleTimeZone(user, userID, request, bot, channelID);
                break;                
            case 'chonk':
                TimeService.getUserTime("ldskfjls");
                break;

            case 'loginfo':
                bot.sendMessage({
                    to: channelID,
                    message: "User: " + user + "\n"
                    + "userID: " + userID +"\n"
                    + "channelID: " + channelID +"\n"
                    + "message: " + message +"\n"
                });
                break;
            case 'nope':
            default:
                bot.sendMessage({
                    to: channelID,
                    message: 'Miss Mae belives you miss spoke'
                });
            break;
            // Just add any case commands if you want to..
        }
    }
});