var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    create_date:{
        type:Date,
        default:Date.now
    }
    
}, { collection : 'List' });

var List = module.exports = mongoose.model('List',listSchema);

module.exports.getToDoList = function(callback,limit){
    List.find(callback).limit(limit);
}
module.exports.addItem = function(item,callback){
    List.create(item,callback);
}
//update genre
module.exports.updateItem = function(id,item,option,callback){
    var query = {_id :id}
    var update = {
        name:item.name
    }
    List.findOneAndUpdate(query,update,option,callback);
}
//delete genre
module.exports.deleteItem = function(id,callback){
    var query = {_id :id}
    List.remove(query,callback);
}