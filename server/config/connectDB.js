const mongoose=require('mongoose');
const colors=require('colors')
const connectDB=async()=>{
    try {   
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        console.log(`Server is running on ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`${error.message}`.bgRed)
    }
}

module.exports=connectDB;