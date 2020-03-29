const  GetDate = () => {
    var today = new Date();
    return (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
}

const GetHours = () => {
    var today = new Date();
    return today.getHours();
}
exports.GetDate = GetDate;
exports.GetHours = GetHours;
  