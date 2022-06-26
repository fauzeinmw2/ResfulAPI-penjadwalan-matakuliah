module.exports = (sequelize, Sequelize) => {
    const Tapel = sequelize.define(
        'tapel',
        {
            tahun_pelajaran: {
                type: Sequelize.STRING,
                allowNull: false 
            }
        },
        {
            tableName: 'tapel'
        }
    );

    return Tapel;
};