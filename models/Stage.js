module.exports = function(sequelize, Sequelize, DataTypes) {
	var Stage = sequelize.define('Stage', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique : false
		},
		status: {
			type: Sequelize.ENUM('success', 'failure'),
			allowNull: false
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	});

	return Stage;
};