var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

List = require('./model/list');
// connect to db
mongoose.connect('mongodb://localhost/todo-db', { useMongoClient: true });
var db = mongoose.connection;

console.log(mongoose.connection.readyState);
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/getList',function(req,res){
    List.getToDoList(function(err,list){
        if(err){
            throw err;
        }
        res.json(list);
    });
});
app.post('/api/addItem',function(req,res){
    var item = req.body;
    List.addItem(item,function(err,list){
        if(err){
            throw err;
        }
        res.json(list);
    });
});

app.put('/api/updateItem/:_id',function(req,res){
    var listItem =req.body;
    List.updateItem(req.params._id,listItem,{},function(err , list){
        if(err){
            throw err;
        }
        res.json(list);
    });
});
app.delete('/api/deleteItem/:_id',function(req,res){
    List.deleteItem(req.params._id,function(err , list){
        if(err){
            throw err;
        }
        res.json(list);
    });
});


app.listen(8080);
console.log("server started on port :8080")
