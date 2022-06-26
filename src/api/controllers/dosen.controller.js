const db = require('../models');
const Dosen = db.dosen;
const User = db.user;
const bcrypt = require('bcryptjs');
const passwordValidator = require('password-validator');

exports.index = (req, res) => {
    Dosen.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'data Dosen berhasil ditampilkan',
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

    var schema = new passwordValidator()
        .min(8, 'Minimal Password 8 Karakter')
        .lowercase(1,'Password Harus memiliki Kombinasi Huruf Kecil')
        .uppercase(1, 'Password Harus memiliki Kombinasi Huruf Besar')
        .digits(1, 'Password Minimal harus memiliki 1 Angka')
        .symbols(1, 'Password Minimal harus memiliki 1 Karekter Spesial')

    // console.log(schema.validate(req.body.password, {details: true}));

    if(!schema.validate(req.body.password)){
        res.status(500).json({
            message: 'Format Password Salah, Minimal Password memiliki 8 karakter dengan kombinasi huruf besar, kecil, angka dan karakter spesial!!!',
        });
    }else{
        const dosen = {
            nama: req.body.nama,
            nip: req.body.nip,
            username: req.body.username
        };
    
        const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            status: 'dosen'
        };
    
    
    
        Dosen.create(dosen)
            .then((result) => {
                User.create(user)
                    .then((result) => {
                        res.status(200).json({
                            message: 'Dosen berhasil ditambahkan...'
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
}

exports.update = (req, res) => {
    const nip = req.params.nip;

    var schema = new passwordValidator()
        .min(8, 'Minimal Password 8 Karakter')
        .lowercase(1,'Password Harus memiliki Kombinasi Huruf Kecil')
        .uppercase(1, 'Password Harus memiliki Kombinasi Huruf Besar')
        .digits(1, 'Password Minimal harus memiliki 1 Angka')
        .symbols(1, 'Password Minimal harus memiliki 1 Karekter Spesial')

    // console.log(schema.validate(req.body.password, {details: true}));

    if(!req.body.password){
        Dosen.findOne( {where: {nip: nip} } )
            .then((result) => {

                if(result == null){
                    res.status(404).json({
                        message: `Dosen dengan NIP: ${nip} tidak ditemukan!!!`
                    });
                    return;
                }

                const username = result.username;

                Dosen.update(
                    {
                        nama: req.body.nama,
                        nip: req.body.nip,
                        username: req.body.username
                    },
                    {
                        where: {
                            nip: nip
                        }
                    }
                ).then((num) => {
                    User.update(
                        {
                            username: req.body.username
                        },
                        {
                            where: {
                                username: username
                            }
                        }
                    ).then((num) => {
                        if(num == 1){
                            res.status(200).json({
                                message: 'Data Dosen Berhasil Diupdate'
                            });
                        }else{
                            res.status(500).json({
                                message: `Tidak dapat merubah data dosen dengan id ${id}`
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
    }else{
        if(!schema.validate(req.body.password)){
            res.status(500).json({
                message: 'Format Password Salah, Minimal Password memiliki 8 karakter dengan kombinasi huruf besar, kecil, angka dan karakter spesial!!!',
            });
        }else{
    
            Dosen.findOne( {where: {nip: nip} } )
                .then((result) => {
    
                    if(result == null){
                        res.status(404).json({
                            message: `Dosen dengan NIP: ${nip} tidak ditemukan!!!`
                        });
                        return;
                    }
    
                    const username = result.username;
    
                    Dosen.update(
                        {
                            nama: req.body.nama,
                            nip: req.body.nip,
                            username: req.body.username
                        },
                        {
                            where: {
                                nip: nip
                            }
                        }
                    ).then((num) => {
                        User.update(
                            {
                                username: req.body.username,
                                password: bcrypt.hashSync(req.body.password, 8)
                            },
                            {
                                where: {
                                    username: username
                                }
                            }
                        ).then((num) => {
                            if(num == 1){
                                res.status(200).json({
                                    message: 'Data Dosen Berhasil Diupdate'
                                });
                            }else{
                                res.status(500).json({
                                    message: `Tidak dapat merubah data dosen dengan id ${id}`
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
        }
    }
    
    
};

exports.delete = (req, res) => {
    const nip = req.params.nip;

    Dosen.findOne( {where: {nip: nip} } )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Dosen dengan NIP: ${nip} tidak ditemukan!!!`
                });
                return;
            }

            const username = result.username;

            Dosen.destroy({
                where: {
                    nip: nip
                }
            }).then((num) => {

                User.destroy({
                    where: {
                        username: username
                    }
                }).then((num) => {
                    if(num == 1){
                        res.status(200).json({
                            message: 'Data dosen berhasil dihapus'
                        });
                    }else{
                        res.status(500).json({
                            message: `Data dosen dengan nip ${nip} tidak ditemukan`
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

exports.find = (req, res) => {
    Dosen.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            nip: req.params.nip
        }
    })
        .then((result) => {

            if(result === null){
                res.status(404).json({
                    message: 'data Dosen tidak ditemukan'
                });  
                return;
            }

            res.status(200).json({
                message: 'data Dosen berhasil ditampilkan',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};