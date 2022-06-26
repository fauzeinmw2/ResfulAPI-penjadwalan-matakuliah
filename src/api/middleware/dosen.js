const db = require('../models');
const User = db.user;
const Dosen = db.dosen;

verifyNIP = (req, res, next) => {

    const nipReq = req.params.nip;

    User.findByPk(req.userId)
        .then((user) => {

            Dosen.findOne( { where: { username: user.username } } )
                .then((dosen) => {
                    if(dosen.nip !== nipReq){
                        res.status(500).json({
                            message: `Kamu Tidak memiliki akses untuk melakukan request ini!`
                        });
                        return;
                    }

                    req.IdDosen = dosen.id
                    next();
                }).catch((err) => {
                    console.log(err.message);
                });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
    
};

module.exports = {
    verifyNIP
};