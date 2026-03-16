import {useState} from 'react';
const Editor=()=>{
    
    const getcode=async(file)=>{
        let code=''
        const username=localStorage.getItem('user');
        const jsonusername=JSON.parse(username)
        const response= await fetch('http://localhost:8080/api/handlecode/getfilecode/', {
          method:'POST',
        // Use uppercase 'POST' (convention)
        headers: {
            'Content-Type': 'application/json'
        },
        // Assuming 'username' is the variable holding the email
        body: JSON.stringify({ 
            username: jsonusername.email,
            filename:file

        }) 
    });
    const data=await response.json();
    //code=data.code
    console.log(data.code)}




      

}
export default Editor;