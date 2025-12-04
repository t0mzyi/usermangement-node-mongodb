import UserDb from "../models/dbSchema.js";
import bcrypt from "bcrypt";

export const registerUser = async (UserData) => {
  try {
    const { userName, email, userpass } = UserData;
    const existinguserName = await UserDb.findOne({ userName: userName });
    if (existinguserName) {
      return {status: false,message: "user name already exists please choose another name",};
    }
    const existingUser = await UserDb.findOne({ email: email });

    if (existingUser) {
      return { status: false, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(userpass, 10);
    const newUser = new UserDb({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return { status: true, message: "User created sucessfull please login" };
  } catch (err) {
    console.log(`err in registerUser`, err);
  }
};

export const loginUser = async (loginData) => {
  try {
    const { email, userpass } = loginData;

    const user = await UserDb.findOne({ email: email });
    if (!user) {
      console.log(`Someone tried to enter`, user);
      return { status: false, message: "Email not found" };
    }
    if(user.deleted){
      return {status : false , message : "You are blocked by adminss"}
    }
    const matchPass = await bcrypt.compare(userpass, user.password);
    if (!matchPass) {
      console.log(`someone entered wrong password`, matchPass);
      return { status: false, message: "Incorrect Passwordd" };
    }
    console.log(`login sucessfull`, user);
    return { status: true, message: "Login Sucessful", user };
  } catch (err) {
    console.log(`err in loginuser service`, err);
  }
};
