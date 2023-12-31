const express = require('express');
const app = express();
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const apiRoutes = require('./routes/apiRoutes');
const admin = require('./routes/admin');

app.use('/api', apiRoutes);
app.use('/api/admin', admin);


app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3030');
});