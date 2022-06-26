const req = require('express/lib/request');
const controller = require('../controllers/jadwal.controller');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    app.get('/api/jadwal/dosen', middleware.verifyToken, middleware.isDosen, controller.dosen);

    app.get('/api/jadwal', middleware.verifyToken, middleware.isAdmin, controller.index);
    app.get('/api/jadwal/search', middleware.verifyToken, middleware.isAdmin, controller.search);
    app.get('/api/jadwal/:id', middleware.verifyToken, middleware.isAdmin, controller.find);
    app.post('/api/jadwal', middleware.verifyToken, middleware.isAdmin, controller.create);
    app.put('/api/jadwal/:id', middleware.verifyToken, middleware.isAdmin, controller.update);
    app.delete('/api/jadwal/:id', middleware.verifyToken, middleware.isAdmin, controller.delete);


}