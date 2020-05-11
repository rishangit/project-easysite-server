const SendResponse = require('../common/responce');
const commonData = require('../common/common_data');

class BaseController {
  constructor(Access) {
    this.Access = Access;
  }

  save(req, res){
    var sendResponse = new SendResponse(res);
    var data = req.body;
    commonData.setData(data, null);
    try {
      var docs = await this.Access.save(data).then();
      sendResponse.sendSuccessObj(docs);
    } catch (error) {}
  }

  async list  (req, res)  {
    var sendResponse = new SendResponse(res);
    var data = req.body;
    try {
      var docs = await this.Access.list(data).then();
      sendResponse.sendSuccessList(docs);
    } catch (error) {}
  };

  async remove   (req, res)  {
    var sendResponse = new SendResponse(res);
    var data = req.body;
    try {
      var docs = await this.Access.remove(data).then();
      sendResponse.sendSuccessObj(docs);
    } catch (error) {}
  };

  async get  (req, res)  {
    var data = req.body;
    var sendResponse = new SendResponse(res);
    try {
      var doc = await this.Access.get(data).then();
      if (doc) sendResponse.sendSuccessObj(doc);
      else sendResponse.sendSuccessObj({});
    } catch (error) {}
  };
}

module.exports = BaseController;