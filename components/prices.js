const Today = (weekend, request, Today, userExists, userID, user, db, bot, channelID) => {
    if(!isNaN(parseInt(request))){
        if(weekend){
            if(userExists){
                db.get('neighbors')
                .find({ id: userID })
                .assign({ selling: parseInt(request), userName: user, updated: Today.GetDate()})
                .write()
            }else{
                db.get('neighbors')
                .push({ id: userID, port: "closed", userName: user, selling: parseInt(request), updated: Today.GetDate()})
                .write()
            }
        }else{
            if(userExists){
                db.get('neighbors')
                .find({ id: userID })
                .assign({ userName: user, purchase: parseInt(request), updated: Today.GetDate(), hour: Today.GetHours()})
                .write()
            }else{
                db.get('neighbors')
                .push({ id: userID, port: "closed", purchase: parseInt(request), userName: user, updated: Today.GetDate(), hour: Today.GetHours()})
                .write()
            }
        }
        bot.sendMessage({
            to: channelID,
            message: 
            'Thank you for the udpate ' + user + '!!' 
        });
    }else{
        var day = Today.GetDate();
        var hour = Today.GetHours();
        if(weekend){
            var topPrice =  10000;
            var topUserID = 0;

            db.get('neighbors').value().map((n) => {
                if(n.selling < topPrice && n.updated === day){
                    topUserID = n.id; topPrice = n.selling
                }
            });
            var topUser = db.get('neighbors').find({id: topUserID}).value();
            if(topUser === undefined){
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m sorry hun, no turnip prices have been listed today. \n' +
                    'Please list yours! Here is an example: $price 46'
                });
            }else{
                var portState = topUser.port === "closed" ? ":no_entry:" : ":airplane";
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m selling turnips for ' + topUser.selling + ' :bell: at ' + topUser.island + ' Island! :palm_tree" \n' +
                    topUser.userName + '\'s port is '+ topUser.port  + ' ' + portState + '! \nDodo code: ' + topUser.dodoCode 
                });
            }
        }else{
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
                if(n.purchase > topPrice && n.updated === day){
                    if(!(hour >= 12 && n.hour < 12)){//if you haven't updated since Noon
                        topUserID = n.id; topPrice = n.purchase
                    }
                }
            });
            var topUser = db.get('neighbors').find({id: topUserID}).value();
            if(topUser === undefined){
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m sorry hun, no stock prices have been listed today. \n' +
                    'Please list yours like: $price 45'
                });
            }else{
                var portState = topUser.port === "closed" ? ":no_entry:" : ":airplane:";
                bot.sendMessage({
                    to: channelID,
                    message: 
                    'I\'m buying turnips for ' + topUser.purchase + ' :bell: at ' + topUser.island + ' Island! :palm_tree: \n' +
                    topUser.userName + '\'s port is '+ topUser.port + ' ' + portState + '! \nDodo code: ' + topUser.dodoCode 
                });
            }
        }
    }
}

exports.Today = Today;