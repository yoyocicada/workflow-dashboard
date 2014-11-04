module.exports = function(sequelize, DataTypes) {
  var DashboardDB = sequelize.define('DashboardDB', {
  
    dashboardDB: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
        
        
        
      },
      
    },
  
  })

  return DashboardDB
}
