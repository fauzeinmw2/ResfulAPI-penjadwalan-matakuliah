const db = require('../config/database');

db.user = require('./user.model')(db.sequelize, db.Sequelize);
db.dosen = require('./dosen.model')(db.sequelize, db.Sequelize);
db.mahasiswa = require('./mahasiswa.model')(db.sequelize, db.Sequelize);
db.admin = require('./admin.model')(db.sequelize, db.Sequelize);

db.matakuliah = require('./matakuliah.model')(db.sequelize, db.Sequelize);
db.matkul_mahasiswa = require('./matkul_mahasiswa.model')(db.sequelize, db.Sequelize);
db.tapel = require('./tapel.model')(db.sequelize, db.Sequelize);

db.kelas = require('./kelas.model')(db.sequelize, db.Sequelize);
db.jurusan = require('./jurusan.model')(db.sequelize, db.Sequelize);

db.jadwal = require('./jadwal.model')(db.sequelize, db.Sequelize);


db.matakuliah.belongsTo(db.jurusan, {
    foreignKey: 'id_jurusan'
});

db.kelas.belongsTo(db.jurusan, {
    foreignKey: 'id_jurusan'
});

db.jadwal.belongsTo(db.dosen, {
    foreignKey: 'id_dosen'
});

db.jadwal.belongsTo(db.tapel, {
    foreignKey: 'id_tapel'
});

db.jadwal.belongsTo(db.kelas, {
    foreignKey: 'id_kelas'
}); 

db.jadwal.belongsTo(db.matakuliah, {
    foreignKey: 'id_matkul'
});

db.matkul_mahasiswa.belongsTo(db.mahasiswa, {
    foreignKey: 'id_mahasiswa'
});

db.matkul_mahasiswa.belongsTo(db.matakuliah, {
    foreignKey: 'id_matkul'
});

db.mahasiswa.belongsTo(db.jurusan, {
    foreignKey: 'id_jurusan'
});

db.mahasiswa.belongsTo(db.kelas, {
    foreignKey: 'id_kelas'
});

module.exports = db;