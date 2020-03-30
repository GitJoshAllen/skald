const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const db = low(adapter)

const Neighbor = require('../models/Neighbor');
const DB_NAME = 'neighbors';


const createNewNeighbor = (user, request, userID) => {
  let newNeighbor = Neighbor.mapDataToNeighborModel(user, request, userID);

  db.get(DB_NAME)
  .push(newNeighbor)
  .write();
}

const updateNeighbor = (user, request) => {
  let updatedNeighbor = Neighbor.mapDataToNeighborModel(user, request);

  db.get(DB_NAME)
  .find({ id: userID })
  .assign(updatedNeighbor)
  .write();
}  

const getNeighbor = (userID) => {
  return db.get(DB_NAME)
  .find({ id: userID})
  .value();
}

const setTimezone = (userID, timeZone) => {
  db.get(DB_NAME)
  .find({ id: userID})
  .assign({ timeZone });
}

const getTimeZone = (userId) => {
  return db.get(DB_NAME)
  .find({ id: userId })
  .value();
}


module.exports =  {
    createNewNeighbor,
    updateNeighbor,
    getNeighbor,
    setTimezone,
    getTimeZone
};