const db = require('../index');
const Dosen = db.dosen;

exports.dosenSeed = () => {
    Dosen.create({
        nama: 'Jhoni Eka Putra, S.Kom',
        nip: '343434',
    });
};