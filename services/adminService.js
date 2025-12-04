
import UserDb from '../models/dbSchema.js'
import bcrypt from 'bcrypt'

export const verifyAdmin = async (data) =>{
    try{
        const{email,userpass} = data;
        const admin = await UserDb.findOne({email:email})
        
        const errmsg = "Invalid Credentials"
        if(!admin){
            return {status:false, message : errmsg}
        }
        const matchPass = await bcrypt.compare(userpass,admin.password)
        if(!matchPass){
            return {status : false, message : errmsg}
        }

        if(!admin.isAdmin){
            return {status : false, message : errmsg}
        }
        console.log(`admin logging sucessfull`)
        return {status:true, admin}
    }catch(err){
        console.log(`err in verfy admin`,err)
    }
}

export const deleteUserAdmin = async(userid,loggedinAdmin) => {
    try{
        if(String(userid) === String(loggedinAdmin)){
            return {status : false, message : "Admins cannot delete themselves!"}
        }
        const user = await UserDb.findById(userid)
        if(!user){
            return {status:false, message : "There is no user with this id"}
        }
        await UserDb.findByIdAndUpdate(userid,{deleted : true})

        return {status: true,message: "User deleted successfully"}

    }catch(err){
        console.log(`err in deleteservice`,err)
    }
}
export const addUser = async (data) => {
    try {
        const { userName, email, password } = data;

       
        if (!userName || !email || !password) {
            return { status: false, message: "All fields are required!" };
        }

        const existingUserName = await UserDb.findOne({ userName: userName });
        if (existingUserName) {
            return { status: false, message: "Username already exists!" };
        }
        const existing = await UserDb.findOne({ email: email });
        if (existing) {
            return { status: false, message: "Email already exists!" };
        }

    
        const hashedPass = await bcrypt.hash(password, 10);

       
        const newUser = new UserDb({
            userName,
            email,
            password: hashedPass,
            isAdmin: false,
            deleted: false
        });

        await newUser.save();

        return { status: true, message: "User created successfully" };

    } catch (err) {
        console.log("Error in addUser service:", err);
        return { status: false, message: "Server error" };
    }
};



