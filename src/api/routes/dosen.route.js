const req = require('express/lib/request');
const controller = require('../controllers/dosen.controller');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    app.get('/api/dosen', middleware.verifyToken, middleware.isAdmin, controller.index);
    app.get('/api/dosen/:nip', middleware.verifyToken, middleware.isAdmin, controller.find);
    app.post('/api/dosen', middleware.verifyToken, middleware.isAdmin, middleware.isDosenExist, controller.create);
    app.put('/api/dosen/:nip', middleware.verifyToken, middleware.isAdmin, middleware.cekNipUpdate, controller.update);
    app.delete('/api/dosen/:nip', middleware.verifyToken, middleware.isAdmin, controller.delete);
}