module.exports = {
    up (queryInterface, Sequelize) {
        console.log('starting migration "user id fix"');
        return queryInterface.changeColumn('Users', 'id', {
            type: Sequelize.DataTypes.INTEGER,
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
