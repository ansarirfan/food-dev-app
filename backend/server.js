import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRoute from './routes/foodRouter.js';
import userRoute from './routes/userRoutes.js';
import 'dotenv/config.js';
import cartRouter from './routes/cardRouter.js';
import orderRouter from './routes/orderRouter.js';


// app config
const app = express();
const port = 4000;


//middleware
app.use(express.json());
app.use(cors());

// db connection
 connectDB();

// Serve static files for images
app.use('/images', express.static('uploads'));

 // api endpoints
 app.use('/api/food', foodRoute)
 app.use('/api/user', userRoute)
 app.use('/api/cart', cartRouter )
 app.use('/api/order', orderRouter)

// method for describe route

app.get('/', (req, res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})