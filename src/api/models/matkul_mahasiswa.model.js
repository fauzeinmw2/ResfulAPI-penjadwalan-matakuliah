module.exports = (sequelize, Sequelize) => {
    const MatkulMahasiswa = sequelize.define(
        'matkul_mahasiswa', 
        {
            id_mahasiswa: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_matkul: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            semester: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'matkul_mahasiswa'
        }
    );

    return MatkulMahasiswa;
};