const db = require('../models');
const Kelas = db.kelas;
const Jurusan = db.jurusan;

exports.index = (req, res) => {
    Kelas.findAll({
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
        order: [
            ['nama_kelas', 'ASC'],
        ],
    })
        .then((result) => {
            res.status(200).json({
                message: 'data Kelas berhasil ditampilkan...',
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
    Kelas.findOne({
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
            id: req.params.id
        }
    })
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Kelas tidak ditemukan`
                });
                return;
            }

            res.status(200).json({
                message: 'data Kelas berhasil ditampilkan...',
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
    const kelas = {
        ... req.body
    };

    Kelas.create(kelas)
        .then((result) => {
            res.status(200).json({
                message: 'Kelas berhasil ditambahkan...'
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

    Kelas.findOne( {where: {id: id} } )
        .then((result) => {
            if(result == null){
                res.status(500).json({
                    message: `Kelas tidak ditemukan`
                });
                return;
            }

            Kelas.update(req.body,{
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Kelas Berhasil Diubah'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal mengubah data Kelas`
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

    Kelas.findOne( {where: {id: id} } )
        .then((result) => {

            if(result == null){
                res.status(500).json({
                    message: `Kelas tidak ditemukan`
                });
                return;
            }

            Kelas.destroy({
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Kelas berhasil dihapus'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal Menghapus data Kelas...`
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