const Output=({output})=>{
    return(
        
        <div style={{ 
    height: "29vh",          // Fixed height
    overflowY: "auto",        // Adds vertical scrollbar only when needed
    backgroundColor: "#1e1e1e", 
    color: "#d4d4d4", 
    
    borderRadius: "4px",
    border: "1px solid #333",
    textAlign: "left"
  }}
>
  <pre style={{ 
    margin: 0, 
    whiteSpace: "pre-wrap",   // Keeps line breaks and wraps long text
    fontFamily: "'Fira Code', monospace",
    fontSize: "14px",
    color:'white'
  }}>
    {output || "Output will appear here..."}
  </pre>
</div>
        
    )


}
export default Output;