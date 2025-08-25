import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';

const  app = express();

mongoose.connect('mongodb+srv://admin:1234@cluster0.3x7vxfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('MongoDB connected successfully')}).catch((err) => {
    console.error('MongoDB connection error:', err)});

app.use(bodyParser.json());

app.use((req,res,next)=>{
    const tokenString = req.header('Authorization');
    if(tokenString!=null){
        const token = tokenString.replace('Bearer ', '');
        jwt.verify(token, 'ashan@1117', (err, decoded) => {
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


app.listen(
    3000, ()=>{
        console.log('Server successfully started in port 3000');
    }
);


//mongodb+srv://admin:1234@cluster0.3x7vxfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0