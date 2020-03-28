const Status = (weekend, request, Today, userExists, userID, user, db, bot, channelID) => {
    var portOptions = ["open", "close", "opened", "closed"];
    request = request === "close" ? "closed" : request;
    request = request === "open" ? "opened" : request;
    if(request === "status" || request === "nope"){
        bot.sendMessage({
            to: channelID,
            message: "Your port is " + db.get('neighbors').find({ id: userID }).value().port + ' ' + (db.get('neighbors').find({ id: userID }).value().port === "closed" ? ":no_entry:" : ":airplane:")
        });
        return;
    }
    if(!portOptions.includes(request)){
        bot.sendMessage({
            to: channelID,
            message: 'Sorry ' + user + ", that port option is not valid"
        });
        return;
    }
    if(userExists){
          db.get('neighbors')
             .find({ id: userID })
             .assign({ port: request})
             .write()
    }else{
          db.get('neighbors')
             .push({ id: userID, port: request})
             .write()
    }
    var portSymbol;
    if(request === "closed"){
        request = "closing";
        portSymbol = ":no_entry:";
    }else{
        request = "opening";
        portSymbol = ":airplane:";
    }
    bot.sendMessage({
        to: channelID,
        message: 'Your port is ' + request + ' ' + portSymbol
    });
}

exports.Status = Status;