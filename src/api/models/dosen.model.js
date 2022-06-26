module.exports = (sequelize, Sequelize) => {
    const Dosen = sequelize.define(
        'dosen', 
        {
            nama: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nip: {
                type: Sequelize.STRING,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'dosen'
        }
    );

    return Dosen;
};