const { DataTypes } = require('sequelize');

module.exports = {
    up (queryInterface) {
        console.log('starting migration "user id fix"');
        return queryInterface.changeColumn('Users', 'id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
        });
    },
    down (queryInterface) {
        return queryInterface.changeColumn('Users', 'id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        });
    },
};
