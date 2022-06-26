const controller = require('../controllers/mahasiswa.controller');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    app.get('/api/mahasiswa', middleware.verifyToken, middleware.isAdmin, controller.index);
    app.get('/api/mahasiswa/:nim', middleware.verifyToken, middleware.isAdmin, controller.find);
    app.post('/api/mahasiswa', middleware.verifyToken, middleware.isAdmin, middleware.isMahasiswaExist, controller.create);
    app.put('/api/mahasiswa/:nim', middleware.verifyToken, middleware.isAdmin, middleware.cekNimUpdate, controller.update);
    app.delete('/api/mahasiswa/:nim', middleware.verifyToken, middleware.isAdmin, controller.delete);
}