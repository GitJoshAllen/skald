const DateHelper = require('../utilities/DateHelper')

const mapDataToNeighborModel = (user, request, userID = undefined) => {
    // New
    let date = DateHelper.GetDate();
    let hours = DateHelper.GetHours();

    if(userID){
        return { 
            id: userID, 
            port: "closed", 
            purchase: parseInt(request), 
            userName: user, 
            updated: date, 
            hour: hours
        }
        
    } else {
        // Update
        return { 
            userName: user, 
            purchase: parseInt(request), 
            updated: date,
            hour: hours
        }
    }
}

module.exports = mapDataToNeighborModel;