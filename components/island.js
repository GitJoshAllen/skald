const Name = (weekend, request, userExists, userID, user, db, bot, channelID) => {
    if(request) {            
        if(userExists){
            db.get('neighbors')
            .find({ id: userID })
            .assign({ island: request})
            .write()

            bot.sendMessage({
                to: channelID,
                message: 
                'Your island :palm_tree: has been renamed to ' + request + '! \n This is much better than the previous name!'
            });
        }else{
            db.get('neighbors')
            .push({ id: userID, port: "closed", userName: user, island: request})
            .write()

            bot.sendMessage({
                to: channelID,
                message: 
                ':pig_nose: Welcome to the Turnip Trades :chart_with_upwards_trend:! I hope you have a wonderful time!'
            });
        }
    } else {
        bot.sendMessage({
            to: channelID,
            message: 'No island name was entered. Please try again.'
        });
    }
}

exports.Name = Name;