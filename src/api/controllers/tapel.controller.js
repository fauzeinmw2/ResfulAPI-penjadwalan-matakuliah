const db = require('../models');
const Tapel = db.tapel;

exports.index = (req, res) => {
    Tapel.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'Tahun Pelajaran berhasil ditampilkan...',
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
    Tapel.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: { id: req.params.id }
    })
        .then((result) => {

            if(result === null){
                res.status(404).json({
                    message: 'data Tahun Pelajaran tidak ditemukan'
                });  
                return;
            }

            res.status(200).json({
                message: 'Tahun Pelajaran berhasil ditampilkan...',
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
    const tapel = {
        ... req.body
    };

    Tapel.create(tapel)
        .then((result) => {
            res.status(200).json({
                message: 'Tahun Pelajaran berhasil ditambahkan...'
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

    Tapel.findOne( {where: {id: id} } )
        .then((result) => {
            if(result == null){
                res.status(404).json({
                    message: `Tahun Pelajaran tidak ditemukan`
                });
                return;
            }

            Tapel.update(req.body,{
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Tahun Pelajaran Berhasil Diubah'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal mengubah data Tahun Pelajaran`
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

    Tapel.findOne( {where: {id: id} } )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Tahun Pelajran tidak ditemukan`
                });
                return;
            }

            Tapel.destroy({
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Tahun Pelajaran berhasil dihapus'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal Menghapus data Tahun Pelajaran...`
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