
const moment = require('moment-timezone');
const DatabaseService = require('./DatabaseService');
const DateHelper = require('../utilities/DateHelper');

const handleTimeZone = (user, userID, request, bot, channelID) => {
   
    if(request) {
        if(moment.tz.zone(request)) {
            let timeZone = moment().tz(request).format();
            DatabaseService.setTimeZone(userID, request);
            bot.sendMessage({
                to: channelID,
                message: user + 'Your time zone has been updated'
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

const calculateTopNeighbor = (startTime, closeTime, isSunday) => {
    let allNeighbors = DatabaseService.getNeighbors();
    let topNeighbor = undefined;

    if(allNeighbors.length > 0) {
        allNeighbors.forEach( neighbor => {
            //moment().tz(neighbor.timeZone).format();
            if(neighbor.turnip.dateSubmitted ) {

                const nookOpenTime = moment(DateHelper.ISODateFormat(startTime)).tz(neighbor.timeZone);
                const nookCloseTime = moment(DateHelper.ISODateFormat(closeTime)).tz(neighbor.timeZone);
                const currentTime = moment(new Date().toUTCString()).tz(neighbor.timeZone);     
                   
                const deadLine = moment.tz(DateHelper.ISODateFormat('12:00')).tz(neighbor.timeZone);

                const neighborPriceDate = moment(neighbor.turnip.dateSubmitted).tz(neighbor.timeZone);

                let isDateValid = false;
                console.log('inside foreach');
                    console.log('inside date submitted if');
                    // Validate date is at least set to today
                if(neighborPriceDate.format('YYYY') === currentTime.format('YYYY')
                        && neighborPriceDate.format('M') === currentTime.format('M')
                        && neighborPriceDate.format('D') === currentTime.format('D')) {

                    if(nookOpenTime < neighborPriceDate
                            && neighborPriceDate < nookCloseTime) {
                            console.log('inside store hours if');

                        if(!isSunday){
                            // First sale of day
                            if(currentTime < deadLine && neighborPriceDate < deadLine) {           
                                    isDateValid = true;        
                            } 
                            
                            if(currentTime > deadLine && neighborPriceDate > deadLine) {           
                                    isDateValid = true;                                    
                            }
                        } else {
                            if(currentTime < nookCloseTime && neighborPriceDate < nookCloseTime
                                && currentTime > nookOpenTime && neighborPriceDate > nookOpenTime) {           
                                isDateValid = true;    
                            }                                                 
                        }

                        if(isDateValid) {
                            if(topNeighbor){
                                if(topNeighbor.turnip.price < neighbor.turnip.price){
                                    topNeighbor = neighbor;
                                }
                            } else {
                                topNeighbor = neighbor;
                            }

                        }
                    }
                } 
            }        
        });        
    }

    return topNeighbor;
}

const getUserTime = (userTimeZone) => {
    console.log(userTimeZone);
}

module.exports = {
    handleTimeZone,
    getUserTime,
    calculateTopNeighbor
};