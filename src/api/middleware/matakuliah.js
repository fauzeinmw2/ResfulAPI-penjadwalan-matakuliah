const db = require('../models');
const Matakuliah = db.matakuliah;

isKodeMatkulExist = (req, res, next) => {

    Matakuliah.findOne({
        where: {
            kode_matakuliah: req.body.kode_matakuliah
        }
    }).then((matakuliah) => {
        if(matakuliah){
            res.status(500).json({
                message: 'Kode Matakuliah Sudah digunakan!'
            });
            return;
        }
        next();
    });
};

cekKodeUpdate = (req, res, next) => {
    const oldKode = req.params.kode;
    const newKode = req.body.kode_matakuliah;

    if(oldKode === newKode){
        next();
    }else{
        Matakuliah.findOne({
            where: {
                kode_matakuliah: req.body.kode_matakuliah
            }
        }).then((matakuliah) => {
            if(matakuliah){
                res.status(500).json({
                    message: 'Kode Matakuliah Sudah digunakan!'
                });
                return;
            }
    
            next();
        });
    }
}

module.exports = {
    isKodeMatkulExist,
    cekKodeUpdate,
};

