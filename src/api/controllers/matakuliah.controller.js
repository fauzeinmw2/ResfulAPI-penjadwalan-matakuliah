const db = require('../models');
const Matakuliah = db.matakuliah;
const Jurusan = db.jurusan;

exports.index = (req, res) => {
    Matakuliah.findAll({
        include: [
            {
                model: Jurusan, 
                as: 'jurusan',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        ],
        attributes: {
            exclude: ['id_jurusan', 'createdAt', 'updatedAt']
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'data matakuliah berhasil ditampilkan',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.find = (req, res) => {
    Matakuliah.findOne({
        include: [
            {
                model: Jurusan, 
                as: 'jurusan',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        ],
        attributes: {
            exclude: ['id_jurusan', 'createdAt', 'updatedAt']
        },
        where: {
            kode_matakuliah: req.params.kode
        }
    })
        .then((result) => {

            if(result === null){
                res.status(404).json({
                    message: 'data Matakuliah tidak ditemukan'
                });  
                return;
            }

            res.status(200).json({
                message: 'data matakuliah berhasil ditampilkan',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.create = (req, res) => {
    const matakuliah = {
        ... req.body
    };

    Matakuliah.create(matakuliah)
        .then((result) => {
            res.status(200).json({
                message: 'Matakuliah berhasil ditambahkan...'
            });     
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
}

exports.update = (req, res) => {
    const kode = req.params.kode;

    Matakuliah.findOne( {where: {kode_matakuliah: kode} } )
        .then((result) => {
            if(result == null){
                res.status(404).json({
                    message: `Matakuliah dengan kode: ${kode} tidak ditemukan`
                });
                return;
            }

            Matakuliah.update(req.body,{
                where: {
                    kode_matakuliah: kode
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Matakuliah Berhasil Diubah'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal mengubah matakuliah`
                    });
                }
            }).catch((err) => {
                res.status(500).json({
                    message: err.message
                });
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.delete = (req, res) => {
    const kode = req.params.kode;

    Matakuliah.findOne( {where: {kode_matakuliah: kode} } )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Matakuliah dengan kode: ${kode} tidak ditemukan`
                });
                return;
            }

            Matakuliah.destroy({
                where: {
                    kode_matakuliah: kode
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Matakuliah berhasil dihapus'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal Menghapus data matakuliah...`
                    });
                }
                
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                });
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        })
}