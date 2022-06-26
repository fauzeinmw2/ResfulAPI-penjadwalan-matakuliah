const { verifyToken, isAdmin, isDosen, isMahasiswa } = require('./authJWT');
const { isDosenExist, isMahasiswaExist, cekNipUpdate, cekNimUpdate } = require('./register');
const { isKodeMatkulExist, cekKodeUpdate } = require('./matakuliah');
const { verifyNIM } = require('./mahasiswa');
const { verifyNIP } = require('./dosen');

module.exports = {
    verifyToken,
    isDosenExist,
    isMahasiswaExist,
    isAdmin,
    isDosen,
    isMahasiswa,
    cekNipUpdate,
    cekNimUpdate,
    isKodeMatkulExist,
    cekKodeUpdate,
    verifyNIM,
    verifyNIP,
};