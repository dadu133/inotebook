import React from 'react'
const Home = (props) => {
     const [notes, setNotes] = React.useState({etitle:"",edescription:"",etag:"default"})
    
  
  const onChange=(e)=>{
    setNotes({...note,[e.target.name]:e.target.value})
    setNote(note.title=notes.etitle,note.description=notes.edescription,note.tag=notes.etag)
  }
    const{id,note,setNote}=props
    
    return (
        <div className='edit-container' style={{display:"none",border:"5px solid brown"}}>
            <h1>Edit a note </h1>
            <p>Title</p>
            <input type='text' id='etitle' name="etitle" value={note.title} onChange={onChange} placeholder='Enter your email' style={{ width: '60%', padding: '5px' }}></input>
            <p>Description</p>
            <input type='text' value={note.description}  id='edescription' name="edescription"onChange={onChange} placeholder='Enter your password' style={{ width: '60%', padding: '5px' }}></input>
            <p>Tag</p>
            <input type='text' value={note.tag} onChange={onChange}  id='etag' name="etag"placeholder='Enter your password' style={{ width: '60%', padding: '5px' }}></input>
           <br></br> <button>Submit</button>
         
     </div>
    )
}
export default Home;
