import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Login=()=>{
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();



    const submitHandler=async(values)=>{
        try{
            setLoading(true);
           const {data}= await axios.post('http://localhost:8080/api/v1/users/login',values);
           setLoading(false);
           message.success('Login successful');
           localStorage.setItem('user',JSON.stringify({...data.user,password:''}));

           navigate('/');


        }catch(error){
            setLoading(false);
            message.error('something went wrong');
        }
    
    }
    useEffect(()=>{
            if(localStorage.getItem('user')){
                navigate('/')
            }
    
        },[navigate])
    return(
       <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        {loading && <Spinner/>}
        <Form layout='vertical' onFinish={submitHandler}>
        <h1>Login Form</h1>
        
        <Form.Item label='Email' name='email'>
            <Input type='email' required/>
        </Form.Item>
        <Form.Item label='Password' name='password'>
            <Input type='password' required/>
        </Form.Item>
        <div className="d-flex justify-content-between"><Link to='/register'  ><span style={{margin:'4px'}}>Not a user ? Click here to register</span></Link>
        <button className='btn btn-primary'>Login</button>
        </div>
        </Form></div>
    

       
)
}
export default Login;