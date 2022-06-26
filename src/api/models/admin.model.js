module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define(
        'admin', 
        {
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'admin'
        }
    );

    return Admin;
};