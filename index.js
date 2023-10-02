require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const port = process.env.port || 4000;
const app = express();
const authRoute = require('./routes/auth');
const shopItemsUser = require('./routes/shopItemsUser');
const shopItemsAdmin = require('./routes/shopItemsAdmin');

mongoose.connect(process.env.mongodbUrl).then(() => console.log("Connected successfully"))
.catch(err => console.log("Not connecting because", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1/auth', authRoute);
app.use('/v1/shop', shopItemsUser);
app.use('/v1/admin/shop', shopItemsAdmin);

app.listen(port, ()=> {
    console.log("Lisening on port", port);
});