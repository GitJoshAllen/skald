const DateHelper = require('../utilities/DateHelper');
const DatabaseService = require('../services/DatabaseService');

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
            var topPrice =  10000;
            var topUserID = 0;

            db.get('neighbors').value().map((n) => {
                if(n.selling < topPrice && n.updated === day){
                    topUserID = n.id; 
                    topPrice = n.selling;
                }
            });

            var topUser = db.get('neighbors').find({id: topUserID}).value();
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
                    'I\'m selling turnips for ' + topUser.selling + ' :bell: at ' + topUser.island + ' Island! :palm_tree: \n' +
                    topUser.userName + '\'s port is '+ topUser.port  + ' ' + portState + '! \nDodo code: ' + topUser.dodoCode 
                });
            }

        } else {
            var topPrice = 0;
            var topUserID = 0;
            //need to monitor each users timezone to determine if we should count them for highest/lowest price
            // if(Today.GetHours() < 8 || Today.GetHours() > 21){
            //     bot.sendMessage({
            //         to: channelID,
            //         message: 
            //         'Please forgive me! The Stalk Market is closed for today'
            //     });
            //     return;
            // }
            db.get('neighbors').value().map((n) => {
                if(n.turnip.price > topPrice && n.updated === day){
                    if(n.hour){
                        if(!(hour >= 12 && n.hour < 12)){
                            //if you haven't updated since Noon
                            topUserID = n.id; 
                            topPrice = n.turnip.price;
                        }
                    }
                }
            });

            var topUser = db.get('neighbors').find({id: topUserID}).value();
            if(topUser === undefined) {
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m sorry hun, no stock prices have been listed today. \n' +
                    'Please list yours like: $price 45'
                });
            } else {
                let isDateValid = TimeService.validateDate(topUser);
                if(isDateValid){
                    var portState = topUser.port === "closed" ? ":no_entry:" : ":airplane:"; 
                    bot.sendMessage({
                        to: channelID,
                        message: 
                        'I\'m buying turnips for ' + topUser.turnip.price + ' :bell: at ' + topUser.island + ' Island! :palm_tree: \n' +
                        topUser.userName + '\'s port is '+ topUser.port + ' ' + portState + '! \nDodo code: ' + (topUser.dodoCode ? topUser.dodoCode : 'no code')
                    });
                } else {
                    // remove price from top user
                    // recalculate top user

                }

            }
        }
    }
}

exports.Today = Today;