const express=require('express');
const app=express();

require('dotenv').config();
const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log('Server live at port no ${PORT}');
})

app.use(express.json());
const cookieParser=require('cookie-parser');
app.use(cookieParser);

require('./config/database').connectServerWithDB();