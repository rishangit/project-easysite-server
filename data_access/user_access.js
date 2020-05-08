const constant = require("../common/const");
const Datastore = require("nedb");
const db = new Datastore({
  filename: constant.dbpath + "user.db",
  autoload: true
});

const save = data => {
  return new Promise((resolve, reject) => {
    db.insert(data, function(err, doc) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

const get = data => {
  return new Promise((resolve, reject) => {
    db.findOne(data, (err, doc) => {
      if (err) reject(err);
      else{
        resolve(doc);
      } 
    });
  });
};




module.exports = {
  save,
  get
}
