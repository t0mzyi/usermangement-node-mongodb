import { verifyAdmin } from "../services/adminService.js"
import UserDb from '../models/dbSchema.js'
import bcrypt from 'bcrypt'

const getLogin = (req,res) => {
    res.render('admin/login',{
        message : req.session.message || null
    })

    req.session.message = null
}
const postLogin = async (req,res) => {
   try{
    const result = await verifyAdmin(req.body)
    if(!result.status){
        req.session.message = result.message
        return res.redirect('/admin')
    }
    req.session.admin = result.admin.userName
    return res.redirect('/home')

   }catch(err){
    console.log(`errr in post login`,err);
    
   }
}
const getHome = async (req,res) => {
    try{
        const searchQuery = req.query.search || '';
        let filter = {}
        if(searchQuery){
            filter = {
                $or : [
                    {userName : {$regex : searchQuery, $options : 'i'}},
                    {email :{$regex : searchQuery, $options : 'i'} }
                ]
            }
        }
        const userdetails = await UserDb.find(filter);
        res.render('admin/home', {userdetails,searchQuery})
    }catch(err){
        console.log(`err in fetching users`, err)
    }
}
const logout = async (req,res) => {
    try{
        req.session.destroy((err) => {
            if(err) {
                return res.send("Error logging out")
            }
            res.clearCokkie("connect.sid")
            res.redirect('/')
        })
    }catch(err){
        console.log(`err in logout`,err)
    }
}

const editUserPage = async (req,res) => {
    try{
        const userId = req.params.userid
        const user = await UserDb.findById(userId)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.render('admin/EditUser',{user})
    }catch(err){
        console.log(err)
    }
}

const editUserPost = async (req,res) => {
    try{
        const userId = req.params.userid
        const{userName , email, password, isAdmin} = req.body

        let updateData ={
            userName,
            email,
            isAdmin : isAdmin === 'on'
        }

        if(password && password.trim() !== ''){
            const hasedPass = await bcrypt.hash(password,10)
            updateData.password = hasedPass
        }

        await UserDb.findByIdAndUpdate(userId, updateData)

        res.redirect('/admin/home');
    }catch(err){
        console.log(`err in edituserpost`,err)
        res.status(500).send("Server Error")
    }
}
export default {getLogin,postLogin,getHome,editUserPage,editUserPost,logout}