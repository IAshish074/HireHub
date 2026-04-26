const mongoose = require("mongoose")

exports.connectDB = async (url)=>{
    try {
        await mongoose.connect(url)
        console.log("MongoDB connected successfully")
    } catch (error) {
       console.log("error while connnecting to DB: ",error.message)
    }
}