import { verifyAdmin,deleteUserAdmin, addUser } from "../services/adminService.js"
import UserDb from '../models/dbSchema.js'
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"


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
    req.session.adminId = result.admin._id
    return res.redirect('/admin/home')

   }catch(err){
    console.log(`errr in post login`,err);
    
   }
}
const getHome = async (req,res) => {
    try{
        const searchQuery = req.query.search || '';
        const deleted = req.query.deleted || null; 
        const error =  req.query.error || null
        const created = req.query.created || null; 
        let filter = {deleted : false}
        if(searchQuery){
            filter.$or = [
                {userName: {$regex: searchQuery, $options: 'i'}},
                {email: {$regex: searchQuery, $options: 'i'}}
            ];
        }
        const userdetails = await UserDb.find(filter);
        res.render('admin/home', {userdetails,deleted,created,error,searchQuery})
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
            res.clearCookie("connect.sid")
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

const deleteUser = async (req,res) => {
    try{

        console.log(req.params.userid)
        const result = await deleteUserAdmin(req.params.userid,req.session.adminId)
        if(!result.status){
            return res.redirect('/admin/home?error='+result.message)
        }
        res.redirect('/admin/home?deleted=true')
    }catch(err){
        console.log(`err`,err)
    }
}
const adduserget = (req,res) => {
    res.render('admin/AddUser', {
        errors: req.session.errors || {},
        old: req.session.old || {},
        message: req.session.message || null
    })
    req.session.errors = null
    req.session.old = null
    req.session.message = null
}
const addUserpost = async (req, res) => {
    try {
        
        req.session.message = null;

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const formattedErrors = {};
            errors.array().forEach((err) => (formattedErrors[err.path] = err.msg));
            
            req.session.errors = formattedErrors;
            req.session.old = req.body;
            return res.redirect("/admin/addUser");
        }

    
        const result = await addUser(req.body);

        if (!result.status) {
            req.session.message = result.message;
            req.session.old = req.body;
            return res.redirect("/admin/addUser");
        }

        return res.redirect("/admin/home?created=true");

    } catch (err) {
        console.log("Error in addUserpost:", err);
        req.session.message = "Server Error. Please try again.";
        return res.redirect("/admin/addUser");
    }
};

export default {adduserget,addUserpost,getLogin,deleteUser,postLogin,getHome,editUserPage,editUserPost,logout}