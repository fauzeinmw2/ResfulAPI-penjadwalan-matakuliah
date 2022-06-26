const db = require('../index');
const Mahasiswa = db.mahasiswa;

exports.mahasiswaSeed = () => {
    Mahasiswa.create({
        nim: '021203',
        nama: 'Fauzein Mulya Warman',
        id_kelas: '1'
    });
};