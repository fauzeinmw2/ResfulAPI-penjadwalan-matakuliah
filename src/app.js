const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    const __apiurl = 'http://localhost:5000/api/';

    app.set('view engine', 'ejs');
    app.use(expressLayouts);

    app.use(session({ secret: process.env.APP_KEY}))
    app.use(cookieParser('secret'));
    app.use(
        session({
            cookie: {maxAge: 6000},
            secret: 'secret',
            resave: true,
            saveUninitialized: true,
        })
    );
    app.use(flash());

    // Halaman Utama / Login
    app.get('/', (req, res) => {
        res.render('login', {
            title: 'Login',
            layout: 'login',
            msg: req.flash('msg'),
        });
    }); 

    app.post('/login', (req, res) => {

        console.log(req.body);
        axios({
            method: 'post',
            url: `${__apiurl}auth/login`,
            headers: { 'content-type': 'application/json' },
            data: req.body
        })
        .then(function (response) {
            req.session.token = response.data.accessToken
            res.redirect('/profile')
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            console.log(err.response.data)
            res.redirect('/'); 
        })
    });

    app.get('/logout', (req, res) => {
        req.session.destroy(function(err) {
            res.redirect('/'); 
        })
    }); 

    app.get('/profile', (req, res) => {

        axios({
            method: 'get',
            url: `${__apiurl}profile`,
            headers: {'Authorization': req.session.token}
          })
            .then(function (response) {
                req.session.statusUser = response.data.status
                res.render('profile', {
                    title: 'Profile',
                    layout: 'layouts/main-layout',
                    data: response.data.data,
                    status: req.session.statusUser
                });
            }).catch((err) => {
                res.redirect('/')
            })
    });

    // Route Dosen
    app.get('/dosen', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}dosen`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('dosen', {
                title: 'Data Dosen',
                layout: 'layouts/main-layout',
                dataDosen: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.get('/dosen/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }
        res.render('dosen/create', {
            title: 'Tambah Data Dosen',
            layout: 'layouts/main-layout',
            status: req.session.statusUser,
            msg: req.flash('msg'),
        });
    })
    app.post('/dosen', (req, res) => {
        axios({
            method: 'post',
            url: `${__apiurl}dosen`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/dosen');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/dosen/add'); 
        })
    });
    app.get('/dosen/:nip', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}dosen/${req.params.nip}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('dosen/edit', {
                title: 'Edit Dosen',
                layout: 'layouts/main-layout',
                data: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/dosen'); 
            }else{
                res.redirect('/')
            }
        });
        
    });
    app.post('/dosen/update/:nip', (req, res) => {
        axios({
            method: 'put',
            url: `${__apiurl}dosen/${req.params.nip}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/dosen');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect(`/dosen/${req.params.nip}`); 
        })
    });
    app.get('/dosen/delete/:nip', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}dosen/${req.params.nip}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/dosen');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/dosen'); 
        })
    })
    // =========================

    // Route Mahasiswa
    app.get('/mahasiswa', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}mahasiswa`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            // console.log(response.data.data.jurusan.nama_jurusan)

            res.render('mahasiswa', {
                title: 'Data Mahasiswa',
                layout: 'layouts/main-layout',
                dataMahasiswa: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.get('/mahasiswa/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }

        axios({
            method: 'get',
            url: `${__apiurl}jurusan`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            axios({
                method: 'get',
                url: `${__apiurl}kelas`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resKelas){
                console.log(response.data.data)
                res.render('mahasiswa/create', {
                    title: 'Tambah Data Mahasiswa',
                    layout: 'layouts/main-layout',
                    dataJurusan: response.data.data,
                    dataKelas: resKelas.data.data,
                    status: req.session.statusUser,
                    msg: req.flash('msg'),
                });
            }).catch((err) => {
                res.redirect('/')
            });
        }).catch((err) => {
            res.redirect('/')
        });

        
    })
    app.post('/mahasiswa', (req, res) => {
        console.log(req.body)

        axios({
            method: 'post',
            url: `${__apiurl}mahasiswa`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/mahasiswa');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/mahasiswa/add'); 
        })
    });
    app.get('/mahasiswa/:nim', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}mahasiswa/${req.params.nim}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            axios({
                method: 'get',
                url: `${__apiurl}jurusan`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resJurusan){
                axios({
                    method: 'get',
                    url: `${__apiurl}kelas`,
                    headers: {'Authorization': req.session.token}
        
                }).then(function (resKelas){
                    res.render('mahasiswa/edit', {
                        title: 'Edit Dosen',
                        layout: 'layouts/main-layout',
                        data: response.data.data,
                        dataJurusan: resJurusan.data.data,
                        dataKelas: resKelas.data.data,
                        status: req.session.statusUser,
                        msg: req.flash('msg'),
                    });
                }).catch((err) => {
                    if(err.response.status == 404){
                        req.flash('msg', err.response.data.message);
                        res.redirect('/mahasiswa'); 
                    }else{
                        res.redirect('/')
                    }
                });
            }).catch((err) => {
                if(err.response.status == 404){
                    req.flash('msg', err.response.data.message);
                    res.redirect('/mahasiswa'); 
                }else{
                    res.redirect('/')
                }
            });

            
            
        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/mahasiswa'); 
            }else{
                res.redirect('/')
            }
        });
        
    });
    app.post('/mahasiswa/update/:nim', (req, res) => {

        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }
        console.log(req.body)
        axios({
            method: 'put',
            url: `${__apiurl}mahasiswa/${req.params.nim}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/mahasiswa');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect(`/mahasiswa/${req.params.nim}`); 
        })
    });
    app.get('/mahasiswa/delete/:nim', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}mahasiswa/${req.params.nim}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/mahasiswa');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/mahasiswa'); 
        })
    })
    // =========================

    // Route Jurusan
    app.get('/jurusan', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}jurusan`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('jurusan', {
                title: 'Data Jurusan',
                layout: 'layouts/main-layout',
                dataJurusan: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.get('/jurusan/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }
        res.render('jurusan/create', {
            title: 'Tambah Data Jurusan',
            layout: 'layouts/main-layout',
            status: req.session.statusUser,
            msg: req.flash('msg'),
        });
    })
    app.post('/jurusan', (req, res) => {
        axios({
            method: 'post',
            url: `${__apiurl}jurusan`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/jurusan');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect('/jurusan/add'); 
        })
    });
    app.get('/jurusan/:id', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}jurusan/${req.params.id}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){


            res.render('jurusan/edit', {
                title: 'Edit Jurusan',
                layout: 'layouts/main-layout',
                data: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/jurusan'); 
            }else{
                res.redirect('/')
            }
        });
        
    });
    app.post('/jurusan/update/:id', (req, res) => {
        axios({
            method: 'put',
            url: `${__apiurl}jurusan/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/jurusan');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect(`/jurusan/${req.params.id}`); 
        })
    });
    app.get('/jurusan/delete/:id', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}jurusan/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/jurusan');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/jurusan'); 
        })
    })
    // =========================

    // Route kelas
    app.get('/kelas', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}kelas`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('kelas', {
                title: 'Data Kelas',
                layout: 'layouts/main-layout',
                dataKelas: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.get('/kelas/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }

        axios({
            method: 'get',
            url: `${__apiurl}jurusan`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('kelas/create', {
                title: 'Tambah Kelas',
                layout: 'layouts/main-layout',
                dataJurusan: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
    })
    app.post('/kelas', (req, res) => {
        axios({
            method: 'post',
            url: `${__apiurl}kelas`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/kelas');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect('/kelas/add'); 
        })
    });
    app.get('/kelas/:id', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}kelas/${req.params.id}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
    
            axios({
                method: 'get',
                url: `${__apiurl}jurusan`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resJurusan){
                res.render('kelas/edit', {
                    title: 'Ubah Data Kelas',
                    layout: 'layouts/main-layout',
                    data: response.data.data,
                    dataJurusan: resJurusan.data.data,
                    status: req.session.statusUser,
                    msg: req.flash('msg'),
                });
            }).catch((err) => {
                res.redirect('/')
            });
        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/kelas'); 
            }else{
                res.redirect('/')
            }
        });
        
    });
    app.post('/kelas/update/:id', (req, res) => {
        axios({
            method: 'put',
            url: `${__apiurl}kelas/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/kelas');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect(`/kelas/${req.params.id}`); 
        })
    });
    app.get('/kelas/delete/:id', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}kelas/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/kelas');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect('/kelas'); 
        })
    })
    // =========================

    // Route Matakuliah
    app.get('/matakuliah', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}matakuliah`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('matakuliah', {
                title: 'Data Matakuliah',
                layout: 'layouts/main-layout',
                dataMatakuliah: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.get('/matakuliah/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }

        axios({
            method: 'get',
            url: `${__apiurl}jurusan`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            console.log(response.data.data)
            res.render('matakuliah/create', {
                title: 'Tambah Data Matakuliah',
                layout: 'layouts/main-layout',
                dataJurusan: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });

    })
    app.post('/matakuliah', (req, res) => {
        axios({
            method: 'post',
            url: `${__apiurl}matakuliah`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/matakuliah');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect('/matakuliah/add'); 
        })
    });
    app.get('/matakuliah/:kode', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}matakuliah/${req.params.kode}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){

            axios({
                method: 'get',
                url: `${__apiurl}jurusan`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resJurusan){
                console.log(response.data.data)
                res.render('matakuliah/edit', {
                    title: 'Edit Matakuliah',
                    layout: 'layouts/main-layout',
                    data: response.data.data,
                    dataJurusan: resJurusan.data.data,
                    status: req.session.statusUser,
                    msg: req.flash('msg'),
                });
            }).catch((err) => {
                if(err.response.status == 404){
                    req.flash('msg', err.response.data.message);
                    res.redirect('/matakuliah'); 
                }else{
                    res.redirect('/')
                }
            });
            
        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/matakuliah'); 
            }else{
                res.redirect('/')
            }
        });
        
    });
    app.post('/matakuliah/update/:kode', (req, res) => {
        axios({
            method: 'put',
            url: `${__apiurl}matakuliah/${req.params.kode}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/matakuliah');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect(`/matakuliah/${req.params.kode}`); 
        })
    });
    app.get('/matakuliah/delete/:kode', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}matakuliah/${req.params.kode}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/matakuliah');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/matakuliah'); 
        })
    })
    // =========================


    // Route Tahun Pelajaran
    app.get('/tapel', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}tahun-pelajaran`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('tahun-pelajaran', {
                title: 'Tahun Pelajaran',
                layout: 'layouts/main-layout',
                dataTapel: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.get('/tapel/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }
        res.render('tahun-pelajaran/create', {
            title: 'Tambah Tahun Pelajaran',
            layout: 'layouts/main-layout',
            status: req.session.statusUser,
            msg: req.flash('msg'),
        });
    })
    app.post('/tapel', (req, res) => {
        axios({
            method: 'post',
            url: `${__apiurl}tahun-pelajaran`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/tapel');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect('/tapel/add'); 
        })
    });
    app.get('/tapel/:id', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}tahun-pelajaran/${req.params.id}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){


            res.render('tahun-pelajaran/edit', {
                title: 'Edit Tahun Pelajaran',
                layout: 'layouts/main-layout',
                data: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/tapel'); 
            }else{
                res.redirect('/')
            }
        });
        
    });
    app.post('/tapel/update/:id', (req, res) => {
        axios({
            method: 'put',
            url: `${__apiurl}tahun-pelajaran/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/tapel');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect(`/tapel/${req.params.id}`); 
        })
    });
    app.get('/tapel/delete/:id', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}tahun-pelajaran/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/tapel');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/tapel'); 
        })
    })
    // =========================


    
    // Route Jadwal
    app.get('/jadwal', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}jadwal`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('jadwal', {
                title: 'Jadwal Matakuliah',
                layout: 'layouts/main-layout',
                dataJadwal: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.post('/jadwal/search', (req, res) => {

        console.log(req.body.nip)
        let urls
        if(!req.body.nip && req.body.tahun_pelajaran){
            urls = `${__apiurl}jadwal/search?tahun_pelajaran=${req.body.tahun_pelajaran}`
        }else if(!req.body.tahun_pelajaran && req.body.nip){
            urls = `${__apiurl}jadwal/search?nip=${req.body.nip}`
        }else if(req.body.nip && req.body.tahun_pelajaran){
            urls = `${__apiurl}jadwal/search?nip=${req.body.nip}&tahun_pelajaran=${req.body.tahun_pelajaran}`
        }else{
            urls = `${__apiurl}jadwal`
        }

        console.log(urls)

        axios({
            method: 'get',
            url: urls,
            headers: {'Authorization': req.session.token},

        }).then(function (response){
            res.render('jadwal', {
                title: 'Jadwal Matakuliah',
                layout: 'layouts/main-layout',
                dataJadwal: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
    });
    app.get('/jadwal/dosen', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}jadwal/dosen`,
            headers: {'Authorization': req.session.token},

        }).then(function (response){
            res.render('jadwal/dosen', {
                title: 'Jadwal Matakuliah',
                layout: 'layouts/main-layout',
                dataJadwal: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
    });
    app.get('/jadwal/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }

        axios({
            method: 'get',
            url: `${__apiurl}dosen`,
            headers: {'Authorization': req.session.token}

        }).then(function (resDosen){
            axios({
                method: 'get',
                url: `${__apiurl}matakuliah`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resMatkul){
                axios({
                    method: 'get',
                    url: `${__apiurl}tahun-pelajaran`,
                    headers: {'Authorization': req.session.token}
        
                }).then(function (resTapel){

                    axios({
                        method: 'get',
                        url: `${__apiurl}kelas`,
                        headers: {'Authorization': req.session.token}
            
                    }).then(function (resKelas){
    
                        res.render('jadwal/create', {
                            title: 'Tambah Jadwal Matakuliah',
                            layout: 'layouts/main-layout',
                            dataDosen: resDosen.data.data,
                            dataMatakuliah: resMatkul.data.data,
                            dataTapel: resTapel.data.data,
                            dataKelas: resKelas.data.data,
                            status: req.session.statusUser,
                            msg: req.flash('msg'),
                        });
    
                    }).catch((err) => {
                        res.redirect('/jadwal')
                    });

                }).catch((err) => {
                    res.redirect('/jadwal')
                });
            }).catch((err) => {
                res.redirect('/jadwal')
            });
        }).catch((err) => {
            res.redirect('/jadwal')
        });

        
    })
    app.post('/jadwal', (req, res) => {
        axios({
            method: 'post',
            url: `${__apiurl}jadwal`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/jadwal');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect('/jadwal/add'); 
        })
    });
    app.get('/jadwal/:id', (req, res) => {

        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }

        axios({
            method: 'get',
            url: `${__apiurl}jadwal/${req.params.id}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){

            axios({
                method: 'get',
                url: `${__apiurl}dosen`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resDosen){
                axios({
                    method: 'get',
                    url: `${__apiurl}matakuliah`,
                    headers: {'Authorization': req.session.token}
        
                }).then(function (resMatkul){
                    axios({
                        method: 'get',
                        url: `${__apiurl}tahun-pelajaran`,
                        headers: {'Authorization': req.session.token}
            
                    }).then(function (resTapel){
    
                        axios({
                            method: 'get',
                            url: `${__apiurl}kelas`,
                            headers: {'Authorization': req.session.token}
                
                        }).then(function (resKelas){
        
                            res.render('jadwal/edit', {
                                title: 'Edit Jadwal Matakuliah',
                                layout: 'layouts/main-layout',
                                data: response.data.data,
                                dataDosen: resDosen.data.data,
                                dataMatakuliah: resMatkul.data.data,
                                dataTapel: resTapel.data.data,
                                dataKelas: resKelas.data.data,
                                status: req.session.statusUser,
                                msg: req.flash('msg'),
                            });
        
                        }).catch((err) => {
                            res.redirect('/jadwal')
                        });
    
                    }).catch((err) => {
                        res.redirect('/jadwal')
                    });
                }).catch((err) => {
                    res.redirect('/jadwal')
                });
            }).catch((err) => {
                res.redirect('/jadwal')
            });

        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/jadwal'); 
            }else{
                res.redirect('/')
                // console.log(err.response.data)
            }
        });
        
    });
    app.post('/jadwal/update/:id', (req, res) => {
        axios({
            method: 'put',
            url: `${__apiurl}jadwal/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/jadwal');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect(`/jadwal/${req.params.id}`); 
        })
    });
    app.get('/jadwal/delete/:id', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}jadwal/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/jadwal');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/jadwal'); 
        })
    })
    // =========================


    // Route Matkul Mahasiswa
    app.get('/matkul-mahasiswa', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}matkul-mahasiswa`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){
            res.render('matkul-mahasiswa', {
                title: 'Matakuliah Mahasiswa',
                layout: 'layouts/main-layout',
                dataMatkul: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
        
    });
    app.post('/matkul-mahasiswa/search', (req, res) => {

        let urls
        if(!req.body.nim && req.body.semester){
            urls = `${__apiurl}matkul-mahasiswa/search?semester=${req.body.semester}`
        }else if(!req.body.semester && req.body.nim){
            urls = `${__apiurl}matkul-mahasiswa/search?nim=${req.body.nim}`
        }else if(req.body.nim && req.body.semester){
            urls = `${__apiurl}matkul-mahasiswa/search?nim=${req.body.nim}&semester=${req.body.semester}`
        }else{
            urls = `${__apiurl}matkul-mahasiswa`
        }

        axios({
            method: 'get',
            url: urls,
            headers: {'Authorization': req.session.token},

        }).then(function (response){
            res.render('matkul-mahasiswa', {
                title: 'Matakuliah Mahasiswa',
                layout: 'layouts/main-layout',
                dataMatkul: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
    });
    app.get('/matkul-mahasiswa/mahasiswa', (req, res) => {
        axios({
            method: 'get',
            url: `${__apiurl}matkul-mahasiswa/mahasiswa`,
            headers: {'Authorization': req.session.token},

        }).then(function (response){
            res.render('matkul-mahasiswa/mahasiswa', {
                title: 'Matakuliah Pilihan',
                layout: 'layouts/main-layout',
                dataMatkul: response.data.data,
                status: req.session.statusUser,
                msg: req.flash('msg'),
            });
        }).catch((err) => {
            res.redirect('/')
        });
    });
    app.get('/matkul-mahasiswa/add', (req, res) => {
        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }

        axios({
            method: 'get',
            url: `${__apiurl}mahasiswa`,
            headers: {'Authorization': req.session.token}

        }).then(function (resMahasiswa){
            axios({
                method: 'get',
                url: `${__apiurl}matakuliah`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resMatkul){
                res.render('matkul-mahasiswa/create', {
                    title: 'Tambah Matakuliah Mahasiswa',
                    layout: 'layouts/main-layout',
                    dataMahasiswa: resMahasiswa.data.data,
                    dataMatakuliah: resMatkul.data.data,
                    status: req.session.statusUser,
                    msg: req.flash('msg'),
                });
            }).catch((err) => {
                res.redirect('/matkul-mahasiswa')
            });
        }).catch((err) => {
            res.redirect('/matkul-mahasiswa')
        });
    
    })
    app.post('/matkul-mahasiswa', (req, res) => {
        axios({
            method: 'post',
            url: `${__apiurl}matkul-mahasiswa`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/matkul-mahasiswa');
        }).catch((err) => {
            req.flash('msg', err.response.data.message);
            res.redirect('/matkul-mahasiswa/add'); 
        })
    });
    app.get('/matkul-mahasiswa/:id', (req, res) => {

        if(req.session.statusUser !== 'admin'){
            res.redirect('/')
            return
        }

        axios({
            method: 'get',
            url: `${__apiurl}matkul-mahasiswa/${req.params.id}`,
            headers: {'Authorization': req.session.token}

        }).then(function (response){

            axios({
                method: 'get',
                url: `${__apiurl}mahasiswa`,
                headers: {'Authorization': req.session.token}
    
            }).then(function (resMahasiswa){
                axios({
                    method: 'get',
                    url: `${__apiurl}matakuliah`,
                    headers: {'Authorization': req.session.token}
        
                }).then(function (resMatkul){
                    res.render('matkul-mahasiswa/edit', {
                        title: 'Tambah Matakuliah Mahasiswa',
                        layout: 'layouts/main-layout',
                        data: response.data.data,
                        dataMahasiswa: resMahasiswa.data.data,
                        dataMatakuliah: resMatkul.data.data,
                        status: req.session.statusUser,
                        msg: req.flash('msg'),
                    });
                }).catch((err) => {
                    res.redirect('/matkul-mahasiswa')
                });
            }).catch((err) => {
                res.redirect('/matkul-mahasiswa')
            });

        }).catch((err) => {
            if(err.response.status == 404){
                req.flash('msg', err.response.data.message);
                res.redirect('/matkul-mahasiswa'); 
            }else{
                res.redirect('/')
                // console.log(err.response.data)
            }
        });
        
    });
    app.post('/matkul-mahasiswa/update/:id', (req, res) => {
        axios({
            method: 'put',
            url: `${__apiurl}matkul-mahasiswa/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            },
            data: req.body
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/matkul-mahasiswa');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect(`/matkul-mahasiswa/${req.params.id}`); 
        })
    });
    app.get('/matkul-mahasiswa/delete/:id', (req, res) => {
        axios({
            method: 'delete',
            url: `${__apiurl}matkul-mahasiswa/${req.params.id}`,
            headers: { 
                'content-type': 'application/json', 
                'Authorization': req.session.token
            }
        })
        .then(function (response) {
            req.flash('msg', response.data.message);
            res.redirect('/matkul-mahasiswa');
        }).catch((err) => {
            // console.log(err.response.data.message)
            req.flash('msg', err.response.data.message);
            res.redirect('/matkul-mahasiswa'); 
        })
    })
    // =========================
}