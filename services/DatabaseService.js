const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const db = low(adapter)

const Neighbor = require('../models/Neighbor');
const DB_NAME = 'neighbors';

db.defaults({ neighbors: [] })
  .write()

const createNewNeighbor = (user, request, userID) => {
  let newNeighbor = Neighbor.mapDataToNeighborModel(user, request, userID);

  db.get(DB_NAME)
  .push(newNeighbor)
  .write();
}

const updateNeighbor = (user, request, userID) => {
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

const getNeighbors = () => db.get(DB_NAME).value();


const setTimeZone = (userID, timeZone) => {
  db.get(DB_NAME)
  .find({ id: userID})
  .assign({ timeZone })
  .write();
}

const getTimeZone = (userID) => {
  return db.get(DB_NAME)
  .find({ id: userID })
  .value();
}

const checkUserExists = (userID) => (db
    .get(DB_NAME)
    .find({ id: userID }).value() !== undefined);


const updatePurchase = (userID, request) => {
  db.get(DB_NAME)
  .find({ id: userID })
  .assign({ 
    turnip: {
      price: parseInt(request),
      dateSubmitted: new Date().toUTCString()
    }
  }).write();
}

const removeTurnipPrice = (userID, price, dateSubmitted) => {
  db.get(DB_NAME)
  .find({id: userID})
  .assign({   
    turnip: {
        price,
        dateSubmitted
  }}).write();

}

const getDb = () => db;


module.exports =  {
    createNewNeighbor,
    updateNeighbor,
    getNeighbor,
    setTimeZone,
    getTimeZone,
    checkUserExists,
    getDb,
    updatePurchase,
    getNeighbors,
    removeTurnipPrice
};