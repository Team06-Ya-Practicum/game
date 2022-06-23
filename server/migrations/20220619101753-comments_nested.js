module.exports = {
    async up (queryInterface, Sequelize) {
        console.log('starting migration "comments nested"');
        return queryInterface.addColumn('Comments', 'parent', {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        });
    },

    async down (queryInterface) {
        return queryInterface.removeColumn('Comments', 'parent');
    },
};
