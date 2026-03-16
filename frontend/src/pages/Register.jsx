import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Register=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false)
    const submitHandler=async(values)=>{
       try{
        setLoading(true)
        await axios.post('https://pythoncodeeditor-48vl.onrender.com/api/v1/users/register',values)
        message.success('Registration successfull')
        setLoading(false)
        navigate('/login')


       }catch(error){
        setLoading(false)
        message.error('invalid username or password')
        console.log(error)

       }
    }
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }

    },[navigate])
    return(<>
   <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    {loading && <Spinner/>}
    <Form layout='vertical' onFinish={submitHandler}>
    <h1>Register Form</h1>
    <Form.Item label='Name' name='name'>
        <Input/>
    </Form.Item>
    <Form.Item label='Email' name='email'>
        <Input type='email'/>
    </Form.Item>
    <Form.Item label='Password' name='password'>
        <Input type='password'/>
    </Form.Item>
    <div className="d-flex justify-content-between"><Link to='/login'  ><span style={{margin:'4px'}}> Already Register ? Click here to login</span></Link>
    <button className='btn btn-primary'>Register</button>
    </div>
    </Form></div>

    </>)
}
export default Register;
