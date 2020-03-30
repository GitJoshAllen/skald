const DateHelper = require('../utilities/DateHelper')

const DEFAULT_TIMEZONE = 'America/Chicago'

const mapDataToNeighborModel = (user, request, userID = undefined) => {
    // New
    let date = DateHelper.getDate();
    let hours = DateHelper.getHours();

    if(userID){
        return { 
            id: userID, 
            port: "closed", 
            turnip: {
                price: request ? parseInt(request) : undefined,
                dateSubmitted: undefined
            },
            timeZone: DEFAULT_TIMEZONE,
            userName: user, 
            updated: date, 
            hour: hours
        }
        
    } else {
        // Update
        return { 
            userName: user, 
            turnip: {
                price: parseInt(request),
                dateSubmitted: new Date().toUTCString()
            },
            updated: date,
            hour: hours
        }
    }
}

exports.mapDataToNeighborModel = mapDataToNeighborModel;