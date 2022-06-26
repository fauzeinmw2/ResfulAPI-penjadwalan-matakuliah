const req = require('express/lib/request');
const controller = require('../controllers/kelas.controller');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    app.get('/api/kelas', middleware.verifyToken, middleware.isAdmin, controller.index);
    app.get('/api/kelas/:id', middleware.verifyToken, middleware.isAdmin, controller.find);
    app.post('/api/kelas', middleware.verifyToken, middleware.isAdmin, controller.create);
    app.put('/api/kelas/:id', middleware.verifyToken, middleware.isAdmin, controller.update);
    app.delete('/api/kelas/:id', middleware.verifyToken, middleware.isAdmin, controller.delete);
}