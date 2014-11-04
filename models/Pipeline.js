module.exports = function(sequelize, Sequelize, DataTypes) {
	console.log("sequelize.STRING************");
	console.log(sequelize);
	var Pipeline = sequelize.define('Pipeline', {
		yearMonth : {
			type : Sequelize.STRING,
			allowNull : false,
			unique : true
		},
		name : {
			type : Sequelize.STRING,
			allowNull : false
		}
	});

	return Pipeline;
};