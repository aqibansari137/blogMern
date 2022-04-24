const mongoose = require('mongoose')

const URL = process.env.URL;

const connectDb = mongoose.connect(URL, { useNewUrlParser: true }, () => console.log('Db connected'))

module.exports = connectDb;