import React, {useState, useEffect} from "react"
import {Link, useNavigate} from 'react-router-dom';
import {message} from 'antd';

const Header = ({setshowmodal,code,setoutput,currentfile,setshowmodal2}) => {
  const [loginUser, setLoginUser] = useState('')
  const navigate = useNavigate();
  const getoutput=async()=>{
    const username=localStorage.getItem('user');
        const jsonusername=JSON.parse(username)
        if(!currentfile){
          message.error('Please select a file to run');
          return;
        }
        try{
    const response = await fetch('http://localhost:8080/api/handlecode/saveCode/', {
        method:'POST', // Use uppercase 'POST' (convention)
        headers: {
            'Content-Type': 'application/json'
        },
        // Assuming 'username' is the variable holding the email
        body: JSON.stringify({ 
            username: jsonusername.email,
            filename: currentfile,
            code:code
            
        }) 
    });
    
    console.log("This is response of save code",response)
    const coderesult=await response.json();
    console.log("this is code result",coderesult['stdout'])
    console.log("this is code result error",coderesult['stderr'])
    if (coderesult['stderr']) {

      console.log("This is error",coderesult['stderr'])
            setoutput(`Error:\n${coderesult['stderr']}`);
    

  }
  else{
    setoutput(coderesult['stdout'].trim());
  }}
  catch(err){
    console.log("Error in getting output",err)
  }}
  
  const handlecreatefile=async()=>{
       const username=localStorage.getItem('user');
        const jsonusername=JSON.parse(username)
         try {
           const response = await fetch('http://localhost:8080/api/handlecode/saveCode/', {
        method:'POST', // Use uppercase 'POST' (convention)
        headers: {
            'Content-Type': 'application/json'
        },
        // Assuming 'username' is the variable holding the email
        body: JSON.stringify({ 
            username: jsonusername.email
            
        }) 
    });
            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}`);
            }
    
            

      }catch (err) {
            console.error("Fetch error:", err);
          


  }}
  const handleclick=()=>{
    setshowmodal('true')

  }
  const handleclick2=()=>{
    setshowmodal2('true')

  }


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success('Logout Successfully');
    navigate('/login');
  }

  return (
    <>
      <nav >
        <div style={{height:'13vh',backgroundColor:'black',color:'white'}} >
          <Link 
            className="navbar-brand" 
            to="/" 
            style={{
              fontWeight: 'bold', 
              fontSize: 'clamp(1rem, 4vw, 1.2rem)',
              marginRight: 'auto',
              flex: '0 1 auto'
            }}
          >
            Python Code Editor
          </Link>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            flex: '0 1 auto'
          }}>
            {loginUser && loginUser.name && (
              <p style={{
                margin: 0,
                padding: '0.5rem',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px'
              }}>
                {loginUser.name}
              </p>
            )}
            <button 
              className="btn btn-primary" 
              onClick={handleclick2}
              style={{
                whiteSpace: 'nowrap',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
               // padding: '0.5rem 1rem'
              }}
            >
              Generate with AI
            </button>
           
            <button 
              className="btn btn-primary" 
              onClick={getoutput}
              style={{
                whiteSpace: 'nowrap',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
               // padding: '0.5rem 1rem'
              }}
            >
              Save & Run
            </button>
           <button 
              className="btn btn-primary" 
              onClick={handleclick}
              style={{
                whiteSpace: 'nowrap',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
               // padding: '0.5rem 1rem'
              }}
            >
              New file
            </button>
           

            
            <button 
              className="btn btn-primary" 
              onClick={logoutHandler}
              style={{
                whiteSpace: 'nowrap',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
               // padding: '0.5rem 1rem'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;