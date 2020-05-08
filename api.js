const express = require('express');
//const SendResponse = require('../common/response');
const router = express.Router();
const debuge = false;

router.get('*', (req, res) => {
     //if (req.session.user || req.url == "/login_user"  || debuge) { 
        let [funct,control] =  req.url.split('_');
        var Controller = require(`./controller/${control}_controller`);
        Controller[funct.substr(1)](req, res);
     //}

})

router.post('*', (req, res) => {
     //if (req.session.user || req.url == "/login_user"  || debuge) { 
        let [funct,control] =  req.url.split('_');
        var Controller = require(`./controller/${control}_controller`);
        Controller[funct.substr(1)](req, res);
     //}

})

module.exports = router;