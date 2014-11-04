module.exports = function(sequelize, Sequelize, DataTypes) {
	var Stage = sequelize.define('Stage', {
		stageN: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true
		},
		status: {
			type: Sequelize.ENUM('success', 'failure'),
			allowNull: false
		},
		info: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		completedBy: {
			type: Sequelize.DATE,
			allowNull: true
		}
	});

	return Stage;
};