const controller = require('../controllers/matkulMahasiswa.controller');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    app.get('/api/matkul-mahasiswa/mahasiswa', middleware.verifyToken, middleware.isMahasiswa, controller.mahasiswa);

    app.get('/api/matkul-mahasiswa', middleware.verifyToken, middleware.isAdmin, controller.index);
    app.get('/api/matkul-mahasiswa/search', middleware.verifyToken, middleware.isAdmin, controller.search);
    app.get('/api/matkul-mahasiswa/:id', middleware.verifyToken, middleware.isAdmin, controller.find);
    app.post('/api/matkul-mahasiswa', middleware.verifyToken, middleware.isAdmin, controller.create);
    app.put('/api/matkul-mahasiswa/:id', middleware.verifyToken, middleware.isAdmin, controller.update);
    app.delete('/api/matkul-mahasiswa/:id', middleware.verifyToken, middleware.isAdmin, controller.delete);


}