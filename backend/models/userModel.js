import mongoose from 'mongoose';

const userSChema = new mongoose.Schema({
    name: {type:String, required:true}, 
    email: {type:String, required:true, unique:true}, 
    password: {type:String, required:true}, 
    cartData: {type:Object, default:{}}, 
}, {minimize:false})

const userModel = mongoose.model.user || mongoose.model("user", userSChema);

export default userModel;