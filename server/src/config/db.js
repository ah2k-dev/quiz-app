const mongoose = require('mongoose');
const dotenv = require('dotenv');
//env config
dotenv.config({
    path: 'src/config/config.env'
});
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const conneciton = mongoose.connection;

module.exports = conneciton;