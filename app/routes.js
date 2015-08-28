var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

router.post('/authenticate', function(req,res) {

  var db = req.db;
  db.collection('users').findOne({'user.id':req.body.username,'user.password':req.body.password},function(err,data) {
    

    if(data === null){
      res.status(500);
      res.send(null);
    } else {

      // return the user sans the password
      res.send({
        _id: data._id,
        user: {
          id: data.user.id,
          role: data.user.role
        }
      });
    }


  });
});

module.exports = router;