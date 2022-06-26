module.exports = (sequelize, Sequelize) => {
    const Kelas = sequelize.define(
        'ruang',
        {
            nama_kelas: {
                type: Sequelize.STRING,
                allowNull: false 
            },
            id_jurusan: {
                type:Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'kelas'
        }
    );

    return Kelas;
};