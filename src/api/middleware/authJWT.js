const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const db = require('../models');
const User = db.user;
const Dosen = db.dosen;
const Mahasiswa = db.mahasiswa;

verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({
            message: 'no token provided!'
        });
    }

    const userID = 0;

    jwt.verify(token, config.secret, (err, decoded) => {  
        if(err){
            return res.status(500).json({
                message: 'unauthorized!'
            });
            // next();
        }
        req.userId = decoded.id;
        next();
    });
    
};

isAdmin = (req, res, next) => {

    User.findOne({
        where: {
            id: req.userId
        }
    }).then((user) => {
        if(user.status !== 'admin'){
            return res.status(403).json({
                message: 'You do not have access to this request...'
            });
        }
        next();
    }).catch((err) => {
        console.log(err);
    });
    
};

isDosen = (req, res, next) => {

    User.findOne({
        where: {
            id: req.userId
        }
    }).then((user) => {

        if(user.status !== 'dosen'){
            return res.status(403).json({
                message: 'Kamu tidak memiliki akses untuk melakukan request ini...'
            });
        }

        Dosen.findOne({
            where: {
                username: user.username
            }
        }).then((dosen) => {

            req.dosenId = dosen.id
            next();
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
    
};

isMahasiswa = (req, res, next) => {

    User.findOne({
        where: {
            id: req.userId
        }
    }).then((user) => {

        if(user.status !== 'mahasiswa'){
            return res.status(403).json({
                message: 'Kamu tidak memiliki akses untuk melakukan request ini...'
            });
        }

        Mahasiswa.findOne({
            where: {
                nim: user.username
            }
        }).then((mahasiswa) => {

            req.mahasiswaId = mahasiswa.id
            next();
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
    
};

module.exports = {
    verifyToken,
    isAdmin,
    isDosen,
    isMahasiswa,
};