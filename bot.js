var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var moment = require('moment-timezone');

var Today = require('./components/today');
var Help = require('./components/help');
var Prices = require('./components/prices');
var Port = require('./components/port');
var Island = require('./components/island');
var Dodo = require('./components/dodo');

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
    if (message.substring(0, 1) == '#') {
        var args = message.substring(1).split(' ');
        var cmd = args[0] ? args[0].toLowerCase() : 'nope';
        var request = args[1] ? args[1] : 'nope';
        var userExists = (db.get('neighbors').find({ id: userID }).value() !== undefined);
        var today = new Date();
        var weekend = false;
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
                Prices.Today(weekend, request, Today, userExists, userID, user, db, bot, channelID);
            break;
            case 'mybodyisready':
                request = "opened";
            case 'port':
                Port.Status(weekend, request, Today, userExists, userID, user, db, bot, channelID);
            break;
            case 'island':
                Island.Name(weekend, request, Today, userExists, userID, user, db, bot, channelID);
            break;
            case 'dodo':
            case 'code':
            case 'dodocode':
                Dodo.Code(weekend, request, Today, userExists, userID, user, db, bot, channelID);
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