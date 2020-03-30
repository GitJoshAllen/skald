const  getDate = () => {
    var today = new Date();
    return (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
}

const getHours = () => {
    var today = new Date();
    return today.getHours();
}

const ISODateFormat = (setTime = '') => {
    var today = new Date();
    return today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + setTime;
}

const getCurrentUTCTime = () => {
    var today = new Date();
    return Date.UTC(
            today.getFullYear(), 
            today.getMonth() + 1, 
            today.getDate(), 
            today.getHours(), 
            today.getMilliseconds());
}

module.exports = {
    getDate,
    getHours,
    ISODateFormat,
    getCurrentUTCTime
}
  