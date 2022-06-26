module.exports = (sequelize, Sequelize) => {
    const Jurusan = sequelize.define(
        'jurusan',
        {
            nama_jurusan: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'jurusan'
        }
    );

    return Jurusan;
};