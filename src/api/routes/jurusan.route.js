const controller = require('../controllers/jurusan.controller');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Header',
            'authorization, Origin, Content-Type, Accept'
        );
        next()
    });

    app.get('/api/jurusan', middleware.verifyToken, middleware.isAdmin, controller.index);
    app.get('/api/jurusan/:id', middleware.verifyToken, middleware.isAdmin, controller.find);
    app.post('/api/jurusan', middleware.verifyToken, middleware.isAdmin, controller.create);
    app.put('/api/jurusan/:id', middleware.verifyToken, middleware.isAdmin, controller.update);
    app.delete('/api/jurusan/:id', middleware.verifyToken, middleware.isAdmin, controller.delete);
}