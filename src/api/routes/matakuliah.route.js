const req = require('express/lib/request');
const controller = require('../controllers/matakuliah.controller');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    app.get('/api/matakuliah', middleware.verifyToken, middleware.isAdmin, controller.index);
    app.get('/api/matakuliah/:kode', middleware.verifyToken, middleware.isAdmin, controller.find);
    app.post('/api/matakuliah', middleware.verifyToken, middleware.isAdmin, middleware.isKodeMatkulExist, controller.create);
    app.put('/api/matakuliah/:kode', middleware.verifyToken, middleware.isAdmin, middleware.cekKodeUpdate, controller.update);
    app.delete('/api/matakuliah/:kode', middleware.verifyToken, middleware.isAdmin, controller.delete);
}