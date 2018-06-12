const ObjectId = require("mongodb").ObjectId;

function findOne(callback){  
	global.db.collection("alunos").find({_id: ObjectId(id)}).toArray(callback);
}

function findAll(callback){  
	global.db.collection("alunos").find({}).toArray(callback);
}

function deleteOne(id, callback){
    global.db.collection("alunos").deleteOne({_id: ObjectId(id)}, callback);
}

function insertAluno(customer, callback){
    global.db.collection("alunos").insert(customer, callback);
}

module.exports = { findOne, findAll, deleteOne, insertAluno }