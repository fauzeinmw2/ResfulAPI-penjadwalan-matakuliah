module.exports = (sequelize, Sequelize) => {
    const Jadwal = sequelize.define(
        'jadwal', 
        {
            id_dosen: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_matkul: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            hari: {
                type: Sequelize.STRING,
                allowNull: false
            },
            jam_mulai: { 
                type: 'TIME',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            jam_selesai: {
                type: 'TIME',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            id_kelas: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_tapel: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: 'jadwal'
        }
    );

    return Jadwal;
};