import {useState,useEffect} from 'react'
import '../index.css'
//import getcode from '../pages/HomePage'
export const Filelist=(props)=>{
     const [filelist, setfilelist] = useState([]);
      const [error, setError] = useState(null);
      const [activeFile, setActiveFile] = useState(null);
      const handlefileclick=(file)=>{
        setActiveFile(file);
        props.setcurrentfile(file)
        props.getcode(file)


      }
      const fetchFiles = async () => {
        var username=localStorage.getItem('user');
        var jsonusername=JSON.parse(username)
          try {
           const response = await fetch('https://pythoncodeeditor-48vl.onrender.com/api/handlecode/getallfilenames/', {
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
    
            const data = await response.json();
            console.log(data)
            // Ensure you are setting an array. 
            // If your backend returns { files: [...] }, use setfilelist(data.files)
            setfilelist( data.filenames ); 
           
        }
           catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
          }
        };
    

    
      useEffect(() => {
        var username=localStorage.getItem('user');
        var jsonusername=JSON.parse(username)
        
       console.log(jsonusername.email)
    
        
        fetchFiles()
      }, [props.change]);
      
      const deletefile=async(file)=>{
         const username=localStorage.getItem('user');
        const jsonusername=JSON.parse(username)
         try {
           const response = await fetch('https://pythoncodeeditor-48vl.onrender.com/api/handlecode/deletefile/', {
        method:'POST', // Use uppercase 'POST' (convention)
        headers: {
            'Content-Type': 'application/json'
        },
        // Assuming 'username' is the variable holding the email
        body: JSON.stringify({ 
            username: jsonusername.email,
            filename:file 
        }) 
    });
            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}`);
            }
    
            

      }catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
          }
          props.setcode('')
          fetchFiles();
        }
        
       
      
    
      if (error) return <div>Error: {error}</div>;
    
      return (
        <div style={{width:'20vw',minHeight:'88vh',backgroundColor:"black",color:'white'}} >
          
          <ul >
            {filelist.map((file, index) => (
              // Use a unique key, like the filename or a database ID
              <li style={{
  backgroundColor: activeFile === file ? '#37373d' : 'transparent',
  color: '#CCCCCC', 
  padding: '5px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '13px',
  fontFamily: 'Segoe UI, sans-serif',
  transition: 'background-color 0.1s'
}} onClick={()=>handlefileclick(file)} key={index}> <span  >{file}</span>
              <button style={{
  padding: '2px 6px',
  backgroundColor: 'transparent',
  color: '#858585',
  border: 'none',
  borderRadius: '3px',
  fontSize: '12px',
  cursor: 'pointer'
}} onClick={()=>deletefile(file)}>del</button></li>
            

           
           ) )}
          </ul>
        </div>
      );
    };
    


export default Filelist;
