const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRouter = require('./router/noteRouter');
require('./environment');

const app = express();
const port = process.env.APP_PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.use(cors());
        app.use(express.json());
        app.use('/api/notes', noteRouter);
        app.listen(port, '0.0.0.0', () => {
            console.log(`MongoDB here. Backend here, on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB: ', error);
    });
