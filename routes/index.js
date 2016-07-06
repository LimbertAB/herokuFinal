var express = require('express');
var router = express.Router();
//var db=require("mysql_orm");
var settings={
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"EjemploSistema",
    port:"3306"
}
//var query=db.mysql(settings);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res) {
   var aux=req.body;
   res.render('index', { title: 'Express',informacion:aux,latitud:req.body.lat});
});
module.exports = router;