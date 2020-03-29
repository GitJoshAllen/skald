
const moment = require('moment-timezone');

let setTimeZone = (bot, channelID, request) => {
   
    if(request){

        if(moment.tz.zone(request)){
            let timeFormat = moment().tz(request).format();
            
                    bot.sendMessage({
                        to: channelID,
                        message: timeFormat
                    });

        } else {
            bot.sendMessage({
                to: channelID,
                message: 'you may have phat fungered your timezone, do it again'
            });
        }

    } else {
        //let timzoneList = moment.tz.names().join();
        console.log(moment.tz.names())
        bot.sendMessage({
            to: channelID,
            message: 'wow'
        });
    }
}

let getUserTime = (userTimeZone) => {
    console.log(userTimeZone);
}

module.exports = {
    setTimeZone,
    getUserTime
};