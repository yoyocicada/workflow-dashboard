var fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize'),
	lodash = require('lodash'),
	sequelize = new Sequelize('sequelize_test', 'root', null, {
		dialect : "sqlite", // or 'sqlite', 'postgres', 'mariadb'
		storage : "/Users/hc073q/Documents/sqlite/my.db",
	}),
	db = {};

fs.readdirSync(__dirname).filter(function(file) {
	return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'));
}).forEach(function(file) {
	var model = sequelize.import(path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].options.hasOwnProperty('associate')) {
		db[modelName].options.associate(db);
	}
});

db["Pipeline"].hasMany(db["Stage"], {as:"Stages"});
console.log(db["Pipeline"]);
sequelize.sync();
module.exports = lodash.extend({
	sequelize : sequelize,
	Sequelize : Sequelize
}, db);


console.log(module.exports.toString());