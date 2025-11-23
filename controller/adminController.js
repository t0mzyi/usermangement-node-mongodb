import { verifyAdmin } from "../services/adminService.js"
import UserDb from '../models/dbSchema.js'

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

// const editUser = async (req,res) => {

// }
export default {getLogin,postLogin,getHome,logout}