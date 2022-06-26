module.exports = (sequelize, Sequelize) => {
    const Matakuliah = sequelize.define(
        'matakuliah', 
        {
            kode_matakuliah: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nama_matakuliah: {
                type: Sequelize.STRING,
                allowNull: false
            },
            semester: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            sks: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            id_jurusan: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: 'matakuliah'
        }
    );

    return Matakuliah;
};