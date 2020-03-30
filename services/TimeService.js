
const moment = require('moment-timezone');
const DatabaseService = require('./DatabaseService');

const handleTimeZone = (user, userID, request, bot, channelID) => {
   
    if(request) {
        if(moment.tz.zone(request)) {
            let timeZone = moment().tz(request).format();
            DatabaseService.setTimeZone(userID, request);
            bot.sendMessage({
                to: channelID,
                message: user + ', your time zone has been updated \n TimeZone: ' + timeZone
            });

        } else {
            bot.sendMessage({
                to: channelID,
                message: 'Timezone not valid. Please try again.'
            });
        }

    } else {
        //let timzoneList = moment.tz.names().join();
        let neighbor = DatabaseService.getNeighbor(userID);

        bot.sendMessage({
            to: channelID,
            message: 'Your time zone is set to: ' + neighbor.timeZone
        });
    }
}

const validateTime = (topNeighbor) => {

}

const getUserTime = (userTimeZone) => {
    console.log(userTimeZone);
}

module.exports = {
    handleTimeZone,
    getUserTime
};