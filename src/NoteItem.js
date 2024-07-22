import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from "react-icons/md";

export default function NoteItem(props) {
  const { deleteNote, id, note, title } = props
  return (
    <div className='note-display p-2 my-5' style={{ border: "2px solid black", backgroundColor: "#fff0f8" }}>
      <div className='flex'>
        <p className='text-xl my-2'>Title : {title}</p>
        <div className='self-end flex mx-3'>

          <MdDelete className='cursor-pointer' onClick={() => { deleteNote(id) }} style={{ fontSize: "2rem" }}></MdDelete>
          <FiEdit className='cursor-pointer' onClick={() => { props.show(note, id) }} style={{ fontSize: "2rem" }}></FiEdit>
        </div>
      </div>
      <hr className='h-1 bg-zinc-300'></hr>


      <p className='my-2'>Description: {note.description}</p>
      <hr className='h-1 bg-zinc-300'></hr>
      <p className='my-2'>Tag : {note.tag}</p>
    </div>
  )
}
