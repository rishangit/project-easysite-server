const constant = require('../common/const');
const Datastore = require('nedb');
const db = new Datastore({
  filename: constant.dbpath + 'room.db',
  autoload: true,
});
const dbStatus = new Datastore({
  filename: constant.dbpath + 'room_status.db',
  autoload: true,
});

const get = data => {
  return new Promise((resolve, reject) => {
    db.findOne(data, (err, doc) => {
      if (err) reject(err);
      else {
        resolve(doc);
      }
    });
  });
};

const save = data => {
  return new Promise((resolve, reject) => {
    db.insert(data, function (err, doc) {
      if (err) reject(err);
      else resolve(doc);
    });
  });
};

const list = data => {
  return new Promise((resolve, reject) => {
    let query = {};
    let sort = [];
    if (data.filters && data.filters.length > 0) {
      query = {
        ...query,
        $and: [...data.filters],
      };
    }
    if (data.sorts) {
      sort = data.sorts;
    }
    db.find(query)
      .sort(sort)
      .exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

const remove = data => {
  return new Promise((resolve, reject) => {
    db.remove(data, (err, doc) => {
      if (err) reject(err);
      else {
        if (doc == 1) {
          resolve(data);
        }
      }
    });
  });
};

const get_booked = data => {
  return new Promise((resolve, reject) => {
    dbStatus.findOne(data, (err, doc) => {
      if (err) reject(err);
      else {
        resolve(doc);
      }
    });
  });
};


const save_booked = data => {
  return new Promise((resolve, reject) => {
    dbStatus.insert(data, function (err, doc) {
      if (err) reject(err);
      else resolve(doc);
    });
  });
};

const update_booked = data => {
  return new Promise((resolve, reject) => {
    dbStatus.update({ _id: data._id }, { $set: data }, {}, (err, doc) => {
      if (err) reject(err);
      else {
        if (doc == 1) {
          resolve(data);
        }
      }
    });
  });
};

module.exports = {
  save,
  list,
  remove,
  get,
  save_booked,
  get_booked,
  update_booked,
};
