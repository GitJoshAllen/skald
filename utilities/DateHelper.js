const  getDate = () => {
    var today = new Date();
    return (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
}

const getHours = () => {
    var today = new Date();
    return today.getHours();
}
module.exports = {
    getDate,
    getHours

}
  