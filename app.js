const express = require('express');
const app = express();
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


const apiRoutes = require('./routes/apiRoutes');
const admin = require('./routes/admin');

app.use('/api', apiRoutes);
app.use('/api/admin', admin);


app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3030');
});