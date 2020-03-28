const Name = (weekend, request, Today, userExists, userID, user, db, bot, channelID) => {
    if(request !== "nope"){            
        if(userExists){
            db.get('neighbors')
            .find({ id: userID })
            .assign({ island: request})
            .write()

            bot.sendMessage({
                to: channelID,
                message: 
                'Your island has be renamed to ' + request + '! \n This is much better than the previous name!'
            });
        }else{
            db.get('neighbors')
            .push({ id: userID, port: "closed", userName: user, island: request})
            .write()

            bot.sendMessage({
                to: channelID,
                message: 
                'Welcome to the Turnip Trades! I hope you have a wonderful time!'
            });
        }
    }
}

exports.Name = Name;