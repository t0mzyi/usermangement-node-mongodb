import mongoose from 'mongoose'

const connect = mongoose.connect("mongodb://localhost:27017/userManagement")

connect.then(() => console.log("db connected"))
.catch(() => console.log("Not connected"))

export {connect}