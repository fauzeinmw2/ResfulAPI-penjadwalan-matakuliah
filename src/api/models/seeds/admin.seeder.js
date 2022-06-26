const db = require('../index');
const Admin = db.admin;

exports.adminSeed = () => {
    Admin.create({
        username: 'admin',
        nama: 'Budi Hartono'
    });
};