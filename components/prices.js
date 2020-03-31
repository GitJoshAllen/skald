const DateHelper = require('../utilities/DateHelper');
const DatabaseService = require('../services/DatabaseService');
const TurnipPriceService = require('../services/TurnipPriceService');

const Today = (isSunday, request, userExists, userID, user, db, bot, channelID) => {
    if(!isNaN(parseInt(request))) {
        if(isSunday) {
            if(userExists) {
                db.get('neighbors')
                .find({ id: userID })
                .assign({ 
                    selling: parseInt(request), 
                    userName: user, 
                    updated: Today.GetDate()
                }).write()
            } else {
                db.get('neighbors')
                .push({ 
                    id: userID, 
                    port: "closed", 
                    userName: user, 
                    selling: parseInt(request), 
                    updated: Today.GetDate()
                })
                .write()
            }
        } else {
            DatabaseService.updatePurchase(userID, request);
        }

        bot.sendMessage({
            to: channelID,
            message: 
            'Thank you for the update ' + user + '!!' 
        });

    } else {

        var day = DateHelper.getDate();
        var hour = DateHelper.getHours();
        if(isSunday) {

            var topUser = TurnipPriceService.calculateTopNeighbor('8:00', '12:00', true); // db.get('neighbors').find({id: topUserID}).value();
            if(topUser === undefined) {
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m sorry hun, no turnip prices have been listed today. \n' +
                    'Please list yours! Here is an example: $price 46'
                });
            } else {               

                var portState = topUser.port === "closed" ? ":no_entry:" : ":airplane:";
                bot.sendMessage({
                    to: channelID,
                    message: 
                        'I\'m selling turnips for ' + topUser.turnip.price + ' :bell: at ' + topUser.island + ' Island! :palm_tree: \n' +
                            topUser.userName + '\'s port is '+ topUser.port  + ' ' + portState + '! \nDodo code: ' + topUser.dodoCode 
                });
            }

        } else {

            const topUser = TurnipPriceService.calculateTopNeighbor('8:00', '21:00', false);
             
            // At this point, topUser turnip data is 100% valid 
            if(topUser === undefined) {
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m sorry hun, no stock prices have been listed today. \n' +
                    'Please list yours like: $price 45'
                });
            } else {                
                var portState = topUser.port === "closed" ? ":no_entry:" : ":airplane:"; 
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m buying turnips for ' + topUser.turnip.price + ' :bell: at ' + topUser.island + ' Island! :palm_tree: \n' +
                    topUser.userName + '\'s port is '+ topUser.port + ' ' + portState + '! \nDodo code: ' + topUser.dodoCode
                });               

            }
        }
    }
}

exports.Today = Today;