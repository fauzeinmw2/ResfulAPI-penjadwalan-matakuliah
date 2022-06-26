const db = require('../models');
const MatkulMahasiswa = db.matkul_mahasiswa;
const Mahasiswa = db.mahasiswa;
const Matakuliah = db.matakuliah;

exports.index = (req, res) => {
    MatkulMahasiswa.findAll({
        include: [
            {
                model: Mahasiswa, 
                as: 'mahasiswa',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Matakuliah, 
                as: 'matakuliah',
                attributes: {
                    exclude: ['semester', 'createdAt', 'updatedAt']
                }
            }, 
        ],
        attributes: {
            exclude: ['id_mahasiswa', 'id_matkul', 'createdAt', 'updatedAt']
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'Matakuliah Pilihan Mahasiswa berhasil ditampilkan',
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
    MatkulMahasiswa.findOne({
        include: [
            {
                model: Mahasiswa, 
                as: 'mahasiswa',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Matakuliah, 
                as: 'matakuliah',
                attributes: {
                    exclude: ['semester', 'createdAt', 'updatedAt']
                }
            }, 
        ],
        attributes: {
            exclude: ['id_mahasiswa', 'id_matkul', 'createdAt', 'updatedAt']
        },
        where: { id: req.params.id }
    })
        .then((result) => {

            if(result === null){
                res.status(404).json({
                    message: 'data tidak ditemukan'
                });  
                return;
            }

            res.status(200).json({
                message: 'Matakuliah Pilihan Mahasiswa berhasil ditampilkan',
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

    const {nim} = req.query;
    const {semester} = req.query;
    let nimSearch = nim ? {nim: nim} : null;
    let semesterSearch = semester ? {semester: semester} : null;

    MatkulMahasiswa.findAll({
        include: [
            {
                model: Mahasiswa, 
                as: 'mahasiswa',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    ... nimSearch
                }
            },
            {
                model: Matakuliah, 
                as: 'matakuliah',
                attributes: {
                    exclude: ['semester', 'createdAt', 'updatedAt']
                }  
            }, 
        ],
        attributes: {
            exclude: ['id_mahasiswa', 'id_matkul', 'createdAt', 'updatedAt']
        },
        where: {
            ... semesterSearch
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'Matakuliah Pilihan Mahasiswa berhasil ditampilkan',
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
    const matkul_mahasiswa = {
        ... req.body
    };

    MatkulMahasiswa.create(matkul_mahasiswa)
        .then((result) => {
            res.status(200).json({
                message: 'Matakuliah Pilihan Mahasiswa berhasil ditambahkan...'
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

    MatkulMahasiswa.findOne( {where: {id: id} } )
        .then((result) => {
            if(result == null){
                res.status(404).json({
                    message: `Matakuliah Pilihan Mahasiswa tidak ditemukan`
                });
                return;
            }

            MatkulMahasiswa.update(req.body,{
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Matakuliah Pilihan Mahasiswa Berhasil Diubah'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal mengubah matakuliah pilihan mahasiswa`
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

    MatkulMahasiswa.findOne( {where: {id: id} } )
        .then((result) => {

            if(result == null){
                res.status(404).json({
                    message: `Matakuliah Pilihan Mahasiswa tidak ditemukan`
                });
                return;
            }

            MatkulMahasiswa.destroy({
                where: {
                    id: id
                }
            }).then((num) => {
                if(num == 1){
                    res.status(200).json({
                        message: 'Data Matakuliah Pilihan Mahasiswa berhasil dihapus'
                    });
                }else{
                    res.status(500).json({
                        message: `Gagal Menghapus data matakuliah pilihan mahasiswa...`
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

exports.mahasiswa = (req, res) => {
    MatkulMahasiswa.findAll({
        include: [
            {
                model: Matakuliah, 
                as: 'matakuliah',
                attributes: {
                    exclude: ['semester', 'createdAt', 'updatedAt']
                }
            }, 
        ],
        attributes: {
            exclude: ['id_mahasiswa', 'id_matkul', 'createdAt', 'updatedAt']
        },
        where: {
            id_mahasiswa : req.mahasiswaId
        }
    })
        .then((result) => {
            res.status(200).json({
                message: 'Matakuliah Pilihan Mahasiswa berhasil ditampilkan',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};