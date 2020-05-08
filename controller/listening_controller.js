let { clients } = require('../common/const');
const Enums = require('../common/enums');

const request = (req, res) => {
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
    startTimeOut: timeOutCount,
  };

  const data = req.body;
  const clientFromFor = `${data.for}_${data.from}`;

  if (!clients[clientFromFor]) {
    clients[clientFromFor] = [];
  }

  clients[clientFromFor].push(newClient);
  newClient.startTimeOut({ clientId, clientFromFor });
  req.on('close', () => {
    removeClient({ clientId, clientFromFor });
  });
};

const timeOutCount = ({ clientId, clientFromFor }) => {
  var self = this;
  var clientId = clientId;
  setTimeout(() => {
    var client = clients[clientFromFor].find(c => c.id == clientId);
    if (client && client.res) {
      client.res.send({ typ: 3 });
      removeClient({ clientId, clientFromFor });
    }
  }, 3600 * 4);
};

const sendFor = data => {
  const clientFromFor = `${data.for}_${data.from}`;
  if (clients[clientFromFor]) {
    clients[clientFromFor].forEach(c => {
      let doc = {};
      if (data.obj) doc = { typ: 2, obj: data.obj };
      else doc = { typ: 3 };
      c.res.send(doc);
      removeClient({ clientId: c.id, clientFromFor });
    });
  }
};

const removeClient = ({ clientId, clientFromFor }) => {
  clients[clientFromFor] = clients[clientFromFor].filter(
    c => c.id !== clientId,
  );
};
module.exports = {
  request,
  sendFor,
};
