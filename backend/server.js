const express=require('express');
const app=express();
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv');
const path = require('path');
const dns = require('dns');
// Use Google DNS to bypass local DNS issues
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectDb = require('./config/connectDb');
dotenv.config();
connectDb();
//middlewares
app.use(cors({
    origin:'https://python-code-editor-47am.vercel.app/',
    methods:['GET','POST'],
    credentials:true
}));
app.use(morgan('dev'))
app.use(express.json())
express.urlencoded({extended:true})
//routes
app.get('/',(req,res)=>{
    res.send("<h1>Hello from server</h1>"
    )
})
app.use('/api/v1/users',require('./routes/userRoute'));
app.use('/api/handlecode',require('./routes/codeRoute'))
//app.use('/api/v1/transactions',require('./routes/transactionRoutes'))
/**
const user = require('./models/userModel');

const addUser = async () => {
  const User = new user({ name: 'John Doe', email: 'john@example.com',password:'123' });
  await User.save();
  console.log('User saved!');
};

addUser();*/

const PORT=8080 || process.env.PORT
//listening
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
