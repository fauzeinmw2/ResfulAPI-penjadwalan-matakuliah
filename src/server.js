const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

let whitelist = ['http://localhost:8080', 'http://localhost:5000'];
let corsOptions = {
    origin: function(origin, callback){
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
};


// SWAGGER
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./apidocs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// database
const db = require('./api/models')
const seed = require('./api/models/seeds');
db.sequelize
    // .sync({force: true})
    .sync()
    .then(() => {
        // seed.userSeed();
        // seed.adminSeed();
        // seed.dosenSeed();
        // seed.mahasiswaSeed();
        console.log('database connected');
    })
    .catch((err) => {
        console.log('database connection failed.', err.message);
    });


// app.get('/', (req, res) => {
//     res.json({
//         message: 'server is running...'
//     });
// });

require('./app')(app);

require('./api/routes/auth.route')(app);
require('./api/routes/dosen.route')(app);
require('./api/routes/matakuliah.route')(app);
require('./api/routes/jurusan.route')(app);
require('./api/routes/jadwal.route')(app);
require('./api/routes/kelas.route')(app);
require('./api/routes/matkulMahasiswa.route')(app);
require('./api/routes/mahasiswa.route')(app);
require('./api/routes/tapel.route')(app);

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});