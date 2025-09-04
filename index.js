import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const  app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB connected successfully')}).catch((err) => {
    console.error('MongoDB connection error:', err)});

app.use(bodyParser.json());

app.use((req,res,next)=>{
    const tokenString = req.header('Authorization');
    if(tokenString!=null){
        const token = tokenString.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(decoded!=null){
            req.user = decoded;
            next();
        }
        else{
            res.status(403).json({ message: 'invalid token' });
        }
    
    //next() 
})}else
{next()}}
);

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order',orderRouter);
app.use('/review',reviewRouter);

app.listen(
    3000, ()=>{
        console.log('Server successfully started in port 3000');
    }
);


//mongodb+srv://admin:1234@cluster0.3x7vxfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0