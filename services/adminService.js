

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




