const db = require('../index');
const User = db.user;
const bcrypt = require('bcryptjs');

exports.userSeed = () => {
    User.bulkCreate([
        {
            username: 'admin',
            password: bcrypt.hashSync('admin', 8),
            status: 'admin'
        },
    ]);
};