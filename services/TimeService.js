
const moment = require('moment-timezone');
const DatabaseService = require('./DatabaseService');

const handleTimeZone = (user, userID, request, bot, channelID) => {
   
    if(request) {
        if(moment.tz.zone(request)){
            let timeZone = moment().tz(request).format();
            DatabaseService.setTimeZone(userID, timeZone);
            bot.sendMessage({
                to: channelID,
                message: user + ', your time zone has been updated'
            });

        } else {
            bot.sendMessage({
                to: channelID,
                message: 'Timezone not valid. Please try again.'
            });
        }

    } else {
        //let timzoneList = moment.tz.names().join();
        let neighbor = DatabaseService.getTimeZone(userId);

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
    handleTimeZone,
    getUserTime
};