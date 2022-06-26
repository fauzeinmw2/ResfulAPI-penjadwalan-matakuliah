const db = require('../models');
const Jadwal = db.jadwal;
const Dosen = db.dosen;
const Matakuliah = db.matakuliah;
const Jurusan = db.jurusan;
const Kelas = db.kelas;
const Tapel = db.tapel;
const Op = db.Sequelize.Op;

exports.index = (req, res) => {
    Jadwal.findAll({
        include: [
            {
                model: Dosen,
                as: 'dosen',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Matakuliah,
                as: 'matakuliah',
                include: {
                    model: Jurusan,
                    as: 'jurusan',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: {
                    exclude: ['id_jurusan', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Kelas,
                as: 'ruang',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Tapel,
                as: 'tapel',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['id_dosen', 'id_matkul', 'id_kelas','id_tapel','createdAt', 'updatedAt']
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'data jadwal berhasil ditampilkan',
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
    Jadwal.findOne({
        include: [
            {
                model: Dosen,
                as: 'dosen',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Matakuliah,
                as: 'matakuliah',
                include: {
                    model: Jurusan,
                    as: 'jurusan',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: {
                    exclude: ['id_jurusan', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Kelas,
                as: 'ruang',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Tapel,
                as: 'tapel',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['id_dosen', 'id_matkul','id_kelas', 'id_tapel','createdAt', 'updatedAt']
        },
        where: {
            id: req.params.id
        }
    })
        .then((result) => {

            if(result === null){
                res.status(404).json({
                    message: 'data Jadwal tidak ditemukan'
                });  
                return;
            }

            res.status(200).json({
                message: 'data jadwal berhasil ditampilkan',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.search = (req, res) => {

    const {nip} = req.query;
    const {tahun_pelajaran} = req.query;
    let nipSearch = nip ? {nip: nip} : null;
    let tapelSearch = tahun_pelajaran ? {tahun_pelajaran: { [ Op.like ]: `%${tahun_pelajaran}%` }} : null;


    Jadwal.findAll({
        include: [
            {
                model: Dosen,
                as: 'dosen',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    ... nipSearch
                }
            },
            {
                model: Matakuliah,
                as: 'matakuliah',
                include: {
                    model: Jurusan,
                    as: 'jurusan',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: {
                    exclude: ['id_jurusan', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Kelas,
                as: 'ruang',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Tapel,
                as: 'tapel',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    ... tapelSearch
                }
            }
        ],
        attributes: {
            exclude: ['id_dosen', 'id_matkul','id_kelas', 'id_tapel','createdAt', 'updatedAt']
        },
        
    })
        .then((result) => {
            res.status(200).json({
                message: 'data jadwal berhasil ditampilkan',
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
    const jadwal = {
        ... req.body
    };

    Jadwal.create(jadwal)
        .then((result) => {
            res.status(200).json({
                message: 'Jadwal Matakuliah berhasil ditambahkan...'
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

    Jadwal.findByPk(id)
        .then((result) => {
            if(result == null){
                res.status(404).json({
                    message: `Jadwal Matakuliah tidak ditemukan!!!`
                });
                return;
            }

            Jadwal.update(req.body,{
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Jadwal Matakuliah Berhasil Diubah'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal mengubah Data Jadwal Matakuliah`
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

    Jadwal.findByPk( id )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Jadwal Matakuliah tidak ditemukan!!!`
                });
                return;
            }

            Jadwal.destroy({
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data jadwal matakuliah berhasil dihapus...'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal Menghapus jadwal matakuliah...`
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

exports.dosen = (req, res) => {
    Jadwal.findAll({
        include: [
            {
                model: Matakuliah,
                as: 'matakuliah',
                include: {
                    model: Jurusan,
                    as: 'jurusan',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: {
                    exclude: ['id_jurusan', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Kelas,
                as: 'ruang',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Tapel,
                as: 'tapel',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['id_dosen', 'id_matkul','id_kelas', 'id_tapel','createdAt', 'updatedAt']
        },
        where: {
            id_dosen : req.dosenId
        }
    })
        .then((result) => {
            res.status(200).json({
                message: `data jadwal Anda berhasil ditampilkan`,
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};