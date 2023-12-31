const mongoose = require('mongoose')

const ConnectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  }catch (err){
    console.error(err)
    process.exit()
  }
}

module.exports = ConnectDB