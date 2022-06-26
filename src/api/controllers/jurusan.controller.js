const db = require('../models');
const Jurusan = db.jurusan;

exports.index = (req, res) => {
    Jurusan.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'data jurusan berhasil ditampilkan',
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
    Jurusan.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            id: req.params.id
        }
    })
        .then((result) => {

            if(result === null){
                res.status(404).json({
                    message: 'data Jurusan tidak ditemukan'
                });  
                return;
            }

            res.status(200).json({
                message: 'data jurusan berhasil ditampilkan',
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
    const jurusan = {
        nama_jurusan: req.body.nama_jurusan
    };

    Jurusan.create(jurusan)
        .then((result) => {
            res.status(200).json({
                message: 'Jurusan berhasil ditambahkan...'
            });     
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Jurusan.findByPk(id)
        .then((result) => {
            if(result == null){
                res.status(404).json({
                    message: `Jurusan tidak ditemukan`
                });
                return;
            }

            Jurusan.update(req.body,{
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Jurusan Berhasil Diubah'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal mengubah Data Jurusan`
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
    const id = req.params.id;

    Jurusan.findByPk( id )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Jurusan tidak ditemukan`
                });
                return;
            }

            Jurusan.destroy({
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Jurusan berhasil dihapus'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal Menghapus jurusan...`
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