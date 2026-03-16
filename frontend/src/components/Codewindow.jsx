import {useState} from 'react';
import Editor from "@monaco-editor/react";
import Filelist from './Filelist';
const Codewindow=({code,setcode,showmodal,setshowmodal,change,setchange,showmodal2,setshowmodal2})=>{
    const [newFileName, setNewFileName] = useState('');
    const [prompt, setPrompt] = useState('');
  /**  let code=''
   const getcode=async(file)=>{
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
    code=data.code
    console.log(data.code)}*/
     const handleCreateFile=async()=>{
       const username=localStorage.getItem('user');
        const jsonusername=JSON.parse(username)
        setshowmodal(false);
       
      
         try {
           const response = await fetch('http://localhost:8080/api/handlecode/saveCode/', {
        method:'POST', // Use uppercase 'POST' (convention)
        headers: {
            'Content-Type': 'application/json'
        },
        // Assuming 'username' is the variable holding the email
        body: JSON.stringify({ 
            username: jsonusername.email,
            filename: newFileName,
            code:''
            
        }) 
    }); setNewFileName('')
    setchange(!change)
            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}`);

            }

    
            
}catch (err) {
            console.error("Fetch error:", err);
          


  }

}
const GenerateCode=async()=>{
  const username=localStorage.getItem('user');
  const jsonusername=JSON.parse(username)
  setshowmodal2(false);
  try {
    const response = await fetch('http://localhost:8080/api/handlecode/generatecode/', {
      method:'POST', // Use uppercase 'POST' (convention)
        headers: {
            'Content-Type': 'application/json'
        },
        // Assuming 'username' is the variable holding the email
        body: JSON.stringify({ 
            username: jsonusername.email,
            prompt: prompt
            
        })});
        setPrompt('');
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${data.message}`);
        }
        const data = await response.json();
        const finalcode="#Note:!!!!!!!!!!!!!!!Copy the desired part of code and select the file where you want to add this code and paste it there \n"+data.code
        setcode(finalcode);
        console.log("Generated code:", data.code);
  } catch (err) {
    console.error("Fetch error:", err);
  }}




      


return(
    <>
    {showmodal==='true' && (<div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  }}>
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ marginTop: 0, color: '#333', fontFamily: 'sans-serif' }}>Create New File</h2>
      
      <p style={{ color: '#666', fontSize: '14px' }}>Enter a name for your Python script:</p>
      
      <input 
        type="text" 
        placeholder="example.py"
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          margin: '15px 0',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button 
          onClick={() => setshowmodal(false)}
          style={{
            padding: '10px 15px',
            backgroundColor: '#eee',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cancel
        </button>
        
        <button 
          onClick={handleCreateFile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}
{showmodal2==='true' && (<div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  }}>
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ marginTop: 0, color: '#333', fontFamily: 'sans-serif' }}>Generate Code with AI</h2>
      
      <p style={{ color: '#666', fontSize: '14px' }}>Enter the prompt for generating code</p>
      
      <input 
        type="text" 
        placeholder="Enter the prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          margin: '15px 0',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button 
          onClick={() => setshowmodal2(false)}
          style={{
            padding: '10px 15px',
            backgroundColor: '#eee',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cancel
        </button>
        
        <button 
          onClick={GenerateCode}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Generate
        </button>
      </div>
    </div>
  </div>
)}
    
    
       
<div style={{ border: "1px solid #ddd", width: '80vw' }}>
      <Editor
        height="70vh"
        theme="vs-dark"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setcode(value)} // Updates Parent state
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
    </>
  );}
    

export default Codewindow;
