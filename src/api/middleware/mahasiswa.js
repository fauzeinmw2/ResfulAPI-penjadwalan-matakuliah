const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const db = require('../models');
const User = db.user;
const Mahasiswa = db.mahasiswa;

verifyNIM = (req, res, next) => {

    const nimReq = req.params.nim;

    User.findByPk(req.userId)
        .then((user) => {

            Mahasiswa.findOne( { where: { nim: user.username } } )
                .then((mahasiswa) => {
                    if(mahasiswa.nim !== nimReq){
                        res.status(500).json({
                            message: `Kamu Tidak memiliki akses untuk melakukan request ini!`
                        });
                        return;
                    }

                    req.IdMahasiswa = mahasiswa.id
                    next();
                }).catch((err) => {
                    console.log(err.message);
                });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
    
};

module.exports = {
    verifyNIM
};