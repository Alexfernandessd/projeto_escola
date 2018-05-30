function findAll(callback){  
	global.db.collection("alunos").find({}).toArray(callback);
}
function deleteOne(id, callback){
	const ObjectId = require("mongodb").ObjectId;
    global.db.collection("alunos").deleteOne({_id: ObjectId(id)}, callback);
}

module.exports = { findAll, deleteOne }