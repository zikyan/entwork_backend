import express from 'express';
import dotenv from 'dotenv';
import route from './Routes/routes.js';
dotenv.config();


const PORT=process.env.PORT || 5000;


const app=express();

app.use('/api',route);

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));