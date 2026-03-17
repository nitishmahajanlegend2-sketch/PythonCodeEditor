
const codeModel=require('../models/codeModel');
const axios=require('axios');
const { spawn } = require('child_process');
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });  
    const getfileCode = async (req, res) => {
    try {
        const { username, filename } = req.body;
        const codedoc = await codeModel.findOne({ username, filename });
        if (!codedoc) {
            return res.status(404).json({ message: 'Code not found' });
        }
        res.status(200).json({ code: codedoc.code });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
;





    };
    const saveCode=async (req,res)=>{
        console.log(req.body)
   const {username,filename,code}=req.body;
   console.log("Hey there")
   console.log(username,filename)
       try{
        if(!req.body.username || !req.body.filename){
            res.status(400).json({ message: error.message,m:"this is error by me" });

        }

        const check=await codeModel.find({username,filename})
        console.log("This is not check",check)
        if(check.length!=0){
             updateandrun2(req,res);
        
       }
       else{
       
        const codedoc=new codeModel(req.body);
        console.log("this is code",codedoc)
        await codedoc.save();
        console.log("After saving")
           updateandrun2(req,res)
           /**
         const response = await axios.post('https://pythoncodeeditor-3.onrender.com/execute', {
            code:codedoc.code
        });

        // Send Python's response back to your React frontend
        res.status(200).json({code:response.data})
        /**

       res.json(response.data);
            res.status(200).json({code:response.data})
        res.status(201).json(code);*/
       }
    } catch (error) {
        console.log("final error",error)
        res.status(400).json({ message: error.message });
       }
        
    };
    const deleteCode=async(req,res)=>{
        try{
            const {username,filename}=req.body;
            const codedoc=codeModel.find({username,filename});
            if(!codedoc){
                res.status(404).json({message:'Code not found'})
            }
            await codeModel.deleteOne({username,filename});
            res.status(200).json({message:'Code deleted successfully'})


        }catch(error) {
        res.status(400).json({ message: error.message });
       }
    };
    const updateandrun=async(req,res)=>{
        const {username,filename,code}=req.body;
       
        try{
            const codedoc=codeModel.find({username,filename});
            if(!codedoc){
                res.status(404).json({message:'Code not found'})
            }
            await codeModel.updateOne({username,filename},{code});
            // Forward the code to the Python microservice
            console.log("Reached here")
        const response = await axios.post('https://pythoncodeeditor-3.onrender.com/execute', {
            code:code
        });
            console.log("Reached there")
        console.log(response)

        // Send Python's response back to your React frontend
        res.json(response.data);
       // .status(200).json({:'Code updated successfully'})


    }catch (error) {
        //console.log("This is error",error)
        res.status(400).json({ message: error.message });
       }
};
    
    const getallfilenames=async(req,res)=>{
        try{
            const {username}=req.body;
            console.log("Here is",username)
            const codes=await codeModel.find({username});
            const filenames=codes.map(code=>code.filename);
            console.log("These are filenames",filenames)
            res.status(200).json({filenames});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    const generateCode=async(req,res)=>{
        const {username,prompt}=req.body;
        if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }
   /** try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            systemInstruction: app.post('/api/generate-code', async (req, res) => {
    const { prompt } = req.body;*/

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            systemInstruction: `You are a Python expert that generates only python code and do not write code in any other language. 
            1. The VERY FIRST line must be an important message: # Copy this code and select any file and paste this code in that file
            2. Every explanation, note, or description MUST be written as a Python comment (starting with #).
            3. Provide ONLY valid Python code. No markdown backticks (\`\`\`).
            4. Use comments extensively within the code to explain how the logic works.
            5. Ensure the final output can be executed immediately by a Python interpreter without any manual editing.`,
           
           contents: prompt,
            config: {
                // 'low' thinking level provides the fastest response for coding
                thinkingConfig: { thinkingLevel: 'low' },
                temperature: 0.2, // Lower temperature for more stable/predictable code
            },
        });

        res.json({ code: response.text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Failed to generate code" });}
    }
const updateandrun2=async(req,res)=>{
    const {username,filename,code}=req.body;
        //const code = req.body.code;
    const codedoc=codeModel.find({username,filename});
            if(!codedoc){
                res.status(404).json({message:'Code not found'})
            }
            await codeModel.updateOne({username,filename},{code});

    if (!code) {
        return res.status(400).send({ error: 'No code provided' });
    }

    // 1. Start the python process in "interactive" mode (-) 
    // The '-' tells Python to read from stdin
    const pythonProcess = spawn('python', ['-c', code]);

    let output = '';
    let errorOutput = '';

    // 2. Capture the results
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    // 3. Capture any errors
    pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    // 4. Handle the end of the execution
    pythonProcess.on('close', (code) => {
        if (code !== 0 || errorOutput) {
            return res.json({ 
                success: false, 
                stderr: errorOutput || `Process exited with code ${code}` 
            });
        }
        res.json({ success: true, stdout: output });
    });
};
    


        

    



module.exports={getfileCode,saveCode,getallfilenames,deleteCode,generateCode}
