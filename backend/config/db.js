import mongoose from 'mongoose';

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://pizzaapp:pizza120@cluster0.ivxkw.mongodb.net/food-del").then(console.log("Database connected"));

}