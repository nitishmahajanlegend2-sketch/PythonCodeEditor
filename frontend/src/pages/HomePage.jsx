import { useEffect, useState } from "react";
import Filelist from "../components/Filelist";
import Codewindow from '../components/Codewindow'
import Header from "../components/Header";
import Output from "../components/Output";
//import EditorChild from "./EditorChild";
const HomePage = () => {
  //const [filelist, setfilelist] = useState([]);
  const [error, setError] = useState(null);
   const [code,setcode]=useState('')
   const [showmodal,setshowmodal]=useState('false');
   const [showmodal2,setshowmodal2]=useState('false');
   const[change,setchange]=useState(false)
   const [output,setoutput]=useState('');
   const [currentfile,setcurrentfile]=useState('');
   //const count=useRef();
 
    
  const getcode=async(file)=>{
        const username=localStorage.getItem('user');
        const jsonusername=JSON.parse(username)
        const response= await fetch('https://pythoncodeeditor-48vl.onrender.com/api/handlecode/getfilecode/', {
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
    const data=await response.json()
    //code=data.code
    console.log(data.code)
    setcode(data.code)
  }


  /**useEffect(() => {
    const username=localStorage.getItem('user');
    const jsonusername=JSON.parse(username)
   console.log(jsonusername.email)

    const fetchFiles = async () => {
      try {
       const response = await fetch('http://localhost:8080/api/handlecode/getallfilenames/', {
    method: 'POST', // Use uppercase 'POST' (convention)
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
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    fetchFiles();
  }, []);*/

  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div>
    <Header setshowmodal={setshowmodal} setshowmodal2={setshowmodal2} code={code} setoutput={setoutput} currentfile={currentfile}/>
    <div style={{display:'flex',width:'100vw'}}>
    <Filelist getcode={getcode} setcode={setcode} change={change} setcurrentfile={setcurrentfile}/>
    <div>
    <div style={{width:'80vw'}}>
      <Codewindow code={code} setcode={setcode} showmodal={showmodal} setshowmodal={setshowmodal} showmodal2={showmodal2} setshowmodal2={setshowmodal2} setchange={setchange} change={change} />
      <div style={{width:'80vw',height:'29vh',backgroundColor:'black'}}><Output output={output}/></div>
      </div>

    </div>
    </div></div></>
   
  );
};

export default HomePage;
