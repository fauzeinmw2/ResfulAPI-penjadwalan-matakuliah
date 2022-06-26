const db = require('../models');
const Dosen = db.dosen;
const Mahasiswa = db.mahasiswa;

isDosenExist = (req, res, next) => {

    Dosen.findOne({
        where: {
            nip: req.body.nip
        }
    }).then((dosen) => {
        if(dosen){
            res.status(500).json({
                message: 'NIP is already exists!'
            });
            return;
        }

        next();
    });
};

cekNipUpdate = (req, res, next) => {
    const oldNip = req.params.nip;
    const newNip = req.body.nip;

    if(oldNip === newNip){
        next();
    }else{
        Dosen.findOne({
            where: {
                nip: req.body.nip
            }
        }).then((dosen) => {
            if(dosen){
                res.status(500).json({
                    message: 'NIP is already exists!'
                });
                return;
            }
    
            next();
        });
    }
}

isMahasiswaExist = (req, res, next) => {

    Mahasiswa.findOne({
        where: {
            nim: req.body.nim
        }
    }).then((mahasiswa) => {
        if(mahasiswa){
            res.status(500).json({
                message: 'NIM Sudah digunakan!'
            });
            return;
        }

        next();
    });
};

cekNimUpdate = (req, res, next) => {
    const oldNim = req.params.nim;
    const newNim = req.body.nim;

    if(oldNim === newNim){
        next();
    }else{
        Mahasiswa.findOne({
            where: {
                nim: req.body.nim
            }
        }).then((mahasiswa) => {
            if(mahasiswa){
                res.status(500).json({
                    message: 'NIM Sudah digunakan!'
                });
                return;
            }
    
            next();
        });
    }
}

module.exports = {
    isDosenExist,
    isMahasiswaExist,
    cekNipUpdate,
    cekNimUpdate
};

