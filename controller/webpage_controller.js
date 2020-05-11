const Access = require('../data_access/webpage_access');
const SendResponse = require('../common/responce');
const commonData = require('../common/common_data');

const save = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  console.log('data', data);
  commonData.setData(data, null);
  try {
    var docs = await Access.save(data).then();
    sendResponse.sendSuccessObj(docs);
  } catch (error) {}
};

const list = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.list(data).then();
    sendResponse.sendSuccessList(docs);
  } catch (error) {}
};

const remove = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.remove(data).then();
    sendResponse.sendSuccessObj(docs);
  } catch (error) {}
};

const get = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var doc = await Access.get(data).then();
    if (doc) sendResponse.sendSuccessObj(doc);
    else sendResponse.sendSuccessObj({});
  } catch (error) {}
};

const book = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;

  try {
    const { roomId, docId } = data;
    var doc = null;
    let savedDoc = await Access.get_booked({ roomId, docId }).then();
    if (!savedDoc) {
      commonData.setData(data, null);
      doc = await Access.save_booked(data).then();
    } else {
      commonData.setData(savedDoc, null);
      doc = await Access.update_booked({ ...savedDoc, roomId, docId }).then();
    }
    //sendToDisplay(doc);
    sendResponse.sendSuccessObj(doc);
  } catch (error) {}
};

const getbook = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var doc = await Access.get_booked(data).then();
    if (doc) sendResponse.sendSuccessObj(doc);
    else sendResponse.sendSuccessEmpty();
  } catch (error) {}
};

module.exports = {
  save,
  list,
  remove,
  get,
  book,
  getbook,
};
