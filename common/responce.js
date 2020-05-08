const Enums = require('./enums');

class ResponseBase {
  constructor(res) {
    this.resObj = {};
    this.clents = [];
    this.res = res;
    // this.res.header("Access-Control-Allow-Origin", "*");
    // this.res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // this.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // this.res.header("Access-Control-Allow-Credentials", true);
    
  }
  sendError() { }
  sendSuccessObj() { }
  sendSuccessList() { }
  sendSuccessEmpty() { }
  send() {
    this.res.send(this.resObj);
  }

  allclients(){
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res
    };
    this.clients.push(newClient);

    req.on('close', () => {
      this.clients = this.clients.filter(c => c.id !== clientId);
    });
  }
}

class SendResponse extends ResponseBase {

  sendError(err) {
    this.resObj.typ = Enums.ResponseType.ERROR;
    this.resObj.obj = err;
    this.send();
  }

  sendErrorMsg(ErrorType, msg) {
    this.resObj.typ = Enums.ResponseType.ERROR;
    this.resObj.errTyp = ErrorType
    this.resObj.msg = msg
    this.send();
  }

  sendSuccessObj(obj) {
    this.resObj.typ = Enums.ResponseType.SUCCESS_OBJ;
    this.resObj.obj = obj;
    this.send();
  }

  sendSuccessList(lst, prm, count) {
    this.resObj.typ = Enums.ResponseType.SUCCESS_LIST;
    this.resObj.lst = lst;
    if (prm) {
      this.resObj.prm = prm;
      this.resObj.str = prm.cursor + prm.limit;
    }
    if (count) {
      this.resObj.tot = count;
    }
    this.send();
  }

  sendSuccessEmpty() {
    this.resObj.typ = Enums.ResponseType.SUCCESS_EMPTY;
    this.send();
  }

  sendSessionExpire() {
    this.resObj.typ = Enums.ResponseType.SESSION_EXPIRE;
    this.send();
  }


  
}

module.exports = SendResponse