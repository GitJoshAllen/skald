const Code = (weekend, request, Today, userExists, userID, user, db, bot, channelID) => {
    if(request !== "nope"){            
        if(userExists){
            db.get('neighbors')
            .find({ id: userID })
            .assign({ dodoCode: request})
            .write()

            bot.sendMessage({
                to: channelID,
                message: 'Your Dodo code has been updated!'
            });
        }else{
            db.get('neighbors')
            .push({ id: userID, port: "closed", userName: user, dodoCode: request})
            .write()

            bot.sendMessage({
                to: channelID,
                message: 'Your Stalk Exchange account has been created and \n' + 
                'your Dodo code has been added!'
            });
        }
    }
}

exports.Code = Code;