const db = require('../models');
const Mahasiswa = db.mahasiswa;
const User = db.user;
const Jurusan = db.jurusan;
const Kelas = db.kelas;
const bcrypt = require('bcryptjs');

exports.index = (req, res) => {
    Mahasiswa.findAll({
        include: [
            {
                model: Jurusan, 
                as: 'jurusan',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Kelas, 
                as: 'ruang',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        ],
        attributes: {
            exclude: ['id_jurusan','id_kelas', 'createdAt', 'updatedAt']
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'data Mahasiswa berhasil ditampilkan',
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
    Mahasiswa.findOne({
        include: [
            {
                model: Jurusan, 
                as: 'jurusan',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Kelas, 
                as: 'ruang',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        ],
        attributes: {
            exclude: ['id_jurusan','id_kelas', 'createdAt', 'updatedAt']
        },
        where: {
            nim: req.params.nim
        }
    })
        .then((result) => {

            if(result === null){
                res.status(404).json({
                    message: 'data Mahasiswa tidak ditemukan'
                });  
                return;
            }

            res.status(200).json({
                message: 'data Mahasiswa berhasil ditampilkan',
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
    const mahasiswa = {
        ... req.body
    };

    const user = {
        username: req.body.nim,
        password: bcrypt.hashSync('mahasiswa', 8),
        status: 'mahasiswa'
    };

    Mahasiswa.create(mahasiswa)
        .then((result) => {
            User.create(user)
                .then((result) => {
                    res.status(200).json({
                        message: 'Mahasiswa berhasil ditambahkan...'
                    });
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
}

exports.update = (req, res) => {
    const nim = req.params.nim;

    Mahasiswa.findOne( {where: {nim: nim} } )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Mahasiswa dengan NIM: ${nim} tidak ditemukan!!!`
                });
                return;
            }

            Mahasiswa.update(
                {
                    nama: req.body.nama,
                    nim: req.body.nim,
                    id_jurusan: req.body.id_jurusan,
                    id_kelas: req.body.id_kelas,
                },
                {
                    where: {
                        nim: nim
                    }
                }
            ).then((num) => {
                User.update(
                    { username: req.body.nim },
                    {
                        where: {
                            username: nim
                        }
                    }
                ).then((num) => {
                    if(num == 1){
                        res.status(200).json({
                            message: 'Data mahasiswa Berhasil Diupdate'
                        });
                    }else{
                        res.status(500).json({
                            message: `Tidak dapat merubah data mahasiswa dengan nim : ${nim}`
                        });
                    }
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message
                    });
                });
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
    const nim = req.params.nim;

    Mahasiswa.findOne( {where: {nim: nim} } )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Mahasiswa dengan NIM: ${nim} tidak ditemukan`
                });
                return;
            }

            Mahasiswa.destroy({
                where: {
                    nim: nim
                }
            }).then((num) => {

                User.destroy({
                    where: {
                        username: nim
                    }
                }).then((num) => {
                    if(num == 1){
                        res.status(200).json({
                            message: 'Data mahasiswa berhasil dihapus'
                        });
                    }else{
                        res.status(500).json({
                            message: `Gagal Menghapus data mahasiswa`
                        });
                    }
                });
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