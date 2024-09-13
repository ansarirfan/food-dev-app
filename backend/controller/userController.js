import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


//login user 

const loginUser = async (req, res) =>{
   const {email, password} = req.body;
   try {
    //for email
    const user = await userModel.findOne({email});
    if (!user) {
       return res.json({success:false, message:"User does not exist"});
    }

   // match password
   const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({success:false, message:"Invalid Credentials"});
    }

    //for match all auth
    const token = createToken(user._id);
    res.json({success:true, token});
   } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"});
   }
}

// jwt auth
const createToken =  (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//registered user

const registerUser = async (req, res) =>{
    const { name, password, email} = (req.body);
   try {
    // checking is user already exist
    const exist = await userModel.findOne({email});
    if (exist) {
        return res.json({success:false, message:"User already exist"});
   }

   // validation and password

    if (!validator.isEmail(email)) {
        return res.json({success:false, message:"Please enter a valid email"});
    }

    // checking password
    if (password.length<8) {
        return res.json({success:false, message:"Please enter a strong password"});
    }

    // hashing password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
     
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword,
    })
      // generatre token
      const  user = await newUser.save();
      const token = createToken(user._id);
      res.json({success:true, token})

   } catch (error) {
    console.log(error);
    res.json({success:false, massage:"Error"});
   }
} 


export {loginUser, registerUser}