import express from 'express';
import dotenv from 'dotenv';
import route from './routes/routes.js';
import {connectDb} from './config/connect.js';

dotenv.config();


const PORT=process.env.PORT || 5000;


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api',route);
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
connectDb();