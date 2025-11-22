import mongoose from 'mongoose'


const loginSchema = new mongoose.Schema({
    userName: {
        type: String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true 
    },
    isAdmin : {
      type : Boolean,
      default : false  
    }
},{
    timestamps : true
})



const collection = new mongoose.model('userData', loginSchema)
export default collection