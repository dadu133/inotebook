import React, {  useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    let ref1=useRef();
    let history = useNavigate();
    const host = "https://backend-2-82kk.onrender.com"
    useEffect(() => {
        if (localStorage.getItem('token')) {

            getNotes();

        }
        else {
            history("/login")
        }
        // eslint-disable-next-line
    }, [])

    const noteinit = [];
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [notes, setNotes] = useState(noteinit)
    const [note1, setNote1] = useState({ title: "", description: "", tag: "" })

    const updateNote = (currentNote, id1) => {
        ref1.current.style = "display:block"
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, id: id1 })
    }
    const closemodal=()=>{
      ref1.current.style.display="none"
    }
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`http://localhost:4000/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }
    const handleClick1 = async(e) => {
        e.preventDefault();
         let mess=  await addNote(note1.title, note1.description, note1.tag)
         if (mess.errors===undefined) {
            props.setalert("Note added successfully");
            
        }
        else{
            props.setalert(mess.errors[0].msg);
        }
    }
    const handleClick2 = async(e) => {
        let update=await editNote(note.id, note.etitle, note.edescription, note.etag)
        if(update.success===undefined){
            props.setalert("Internal error Occurs");
        }
        else{

            props.setalert("Note gets changed successfully");
        }
    }

    const onChange1 = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const onChange2 = (e) => {
        setNote1({ ...note1, [e.target.name]: e.target.value })
    }

    const addNote = async (title, description, tag) => {
        // TODO: API Call
        console.log("the title is" + title);
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note))
        return note;
    }

    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',

                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        if(json.success===undefined)
        {
           props.setalert("Internal Error Occured");
        }
        else{
            props.setalert("Note has been deleted successfully");
        }
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // // API Call


        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
     return json;
    }


    return (
        <>
            <div className='edit-container' ref={ref1}>
              <div className='edit-content'>
               
                <h1 className='text-gray-500 text-3xl my-3 text-center'>Edit the note</h1>
                <button onClick={()=>{closemodal()}} className='float-right'><RxCross2 style={{fontSize:'2rem'}}></RxCross2></button>
                <p className='my-2 text-xl'>Title</p>
                <input className='w-[60%] max-md:w-[90%]' type='text' id='etitle' name="etitle" value={note.etitle} onChange={onChange1} placeholder='Enter your new note' style={{ padding: '8px',border:'1px solid grey' }}></input>
                <p className='my-2 text-xl'>Description</p>
                <input  className='w-[60%] max-md:w-[90%]' type='text' id='edescription' name="edescription" value={note.edescription} onChange={onChange1} placeholder='Enter your new description' style={{ padding: '8px',border:'1px solid grey' }}></input>
                <p className='my-2 text-xl'>Tag</p>
                <input className='w-[60%] max-md:w-[90%]' type='text' id='tag' name="etag" value={note.etag} onChange={onChange1} placeholder='Enter your new tag' style={{  padding: '8px',border:'1px solid grey' }}></input>
                <br></br><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2' onClick={handleClick2}>Edit Note</button>

              </div>
            </div>
            <div className='add-note mx-2'>
                <h1 className='text-gray-500 text-4xl my-3'>Add the note</h1>
                <p className='my-2 text-xl'>Title</p>
                <input className=' w-[60%] max-md:w-[90%]' type='text' id='title' name="title" onChange={onChange2} placeholder='Enter the title of note' style={{  padding: '8px',border:'1px solid grey' }}></input>
                <p className='my-2 text-xl'>Description</p>
                <input className='w-[60%] max-md:w-[90%]' type='text' id='description' name="description" onChange={onChange2} placeholder='Enter the description of note' style={{  padding: '8px',border:'1px solid grey'  }}></input>
                <p className='my-2 text-xl'>Tag</p>
                <input className='w-[60%] max-md:w-[90%]' type='text' id='tag' name="tag" onChange={onChange2} placeholder='Enter the tag of note' style={{ padding: '8px',border:'1px solid grey'  }}></input>
                <br></br><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2' onClick={handleClick1}>Add note</button>
            </div>

            <h2 className='text-gray-500 text-3xl max-md:m-3 m-3' >Your Notes</h2>
             
            {notes.length===0 && "No notes to display"}
            {notes.map((note) => {
                return <NoteItem key={note._id} id={note._id} show={updateNote} title={note.title} deleteNote={deleteNote} description={note.description} note={note} />
            })}
        </>
    )
}

export default Notes