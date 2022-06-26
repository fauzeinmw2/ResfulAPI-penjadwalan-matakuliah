const config = require('../config/auth');
const db = require('../models');
const User = db.user;
const Admin = db.admin;
const Dosen = db.dosen;
const Mahasiswa = db.mahasiswa;
const Jurusan = db.jurusan;
const Kelas = db.kelas;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if(!user){
            return res.status(404).json({
                message: 'User Not Found.'
            });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid){
            return res.status(500).json({
                accessToken: null,
                message: 'invalid password'
            });
        }

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 jam aktifnya
        });

        res.status(200).json({
            message: 'Login successfully...',
            accessToken: token
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        });
    });
};

exports.profile = (req, res) => {
    
    User.findByPk(req.userId)
        .then((user) => {

            if(user == null){
                res.status(500).json({
                    message: `Untuk melakukan request ini, login terlebih dahulu!!!`
                });
                return;
            }

            if(user.status === 'admin'){

                Admin.findOne({
                    where: {
                        username: user.username
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }).then((admin) => {
                    res.status(200).json({
                        message: `Profil Berhasil Ditampilkan`,
                        data: admin,
                        status: user.status
                    });
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message
                    });
                })

            }else if(user.status === 'dosen'){

                Dosen.findOne({
                    where: {
                        username: user.username
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }).then((dosen) => {
                    res.status(200).json({
                        message: `Profil Berhasil Ditampilkan`,
                        data: dosen,
                        status: user.status
                    });
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message
                    });
                })

            }else{

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
                    where: {
                        nim: user.username
                    },
                    attributes: {
                        exclude: ['id_jurusan','id_kelas','createdAt', 'updatedAt']
                    },
                }).then((mahasiswa) => {
                    res.status(200).json({
                        message: `Profil Berhasil Ditampilkan`,
                        data: mahasiswa,
                        status: user.status
                    });
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message
                    });
                })

            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
}