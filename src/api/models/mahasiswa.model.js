module.exports = (sequelize, Sequelize) => {
    const Mahasiswa = sequelize.define(
        'mahasiswa', 
        {
            nim: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false
            },
            id_jurusan: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_kelas: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: 'mahasiswa'
        }
    );

    return Mahasiswa;
};