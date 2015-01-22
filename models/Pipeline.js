module.exports = function(sequelize, Sequelize, DataTypes) {
	console.log("sequelize.STRING************");
	console.log(sequelize);
	var Pipeline = sequelize.define('Pipeline', {
		name : {
			type : Sequelize.STRING,
			allowNull : false,
			unique : true
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	});

	return Pipeline;
};