module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'user', 
        {
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'user'
        }
    );

    return User;
};