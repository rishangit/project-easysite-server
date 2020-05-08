
const moment = require('moment');

const setData = (data, user)=>{
    data.dateEdited = moment().valueOf();
    if (!data.dateCreated)
        data.dateCreated = data.dateEdited;
    data.editedBy = user ? user._id : 'admin';
    if (!data.createdBy)
        data.createdBy = data.editedBy;
    if (!data.archive) {
        data.archive = false;
    }
}
module.exports = {
    setData
}