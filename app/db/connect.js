const mongoose = require("mongoose")

//const connectionString = 'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = () => {
    return mongoose.connect('mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}

module.exports = connectDB