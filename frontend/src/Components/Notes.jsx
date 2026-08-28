import React from 'react'
import { useContext,useEffect,useRef,useState } from 'react'
import Notesitem from './Noteitem.jsx'
import NotesContext from '../Context/NotesContext.jsx'
export default function Notes() {
     const {notes, setNotes,addNote,getNotes,editNote} = useContext(NotesContext);
     const ref = useRef(null);
      const refClose = useRef(null);
     useEffect(() => {
        getNotes();
      }, []);
      const updateNote = (currentNote) => {
       ref.current.click();
       setNote({ id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
      }
      const [note, setNote] = React.useState({etitle:"", edescription:"", etag:"genral"});
      const addNotes = (e) => {
        e.preventDefault();
        console.log("Updating the note...", note); 
        editNote(note.id, note.etitle, note.edescription, note.etag);      
        refClose.current.click();
      }
      const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
   <>  
  
<button type="button" ref={ref} className=" d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
         <div className="container my-3">
      <form>
        <div className="mb-3 ">
          <label htmlFor="etitle"  className="form-label">
           Title
          </label>

          <input
            type="text"
            className="form-control"
            id="etitle"
            value={note.etitle}
            name="etitle"
            aria-describedby="emailHelp"
            onChange={onChange}
          />

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>

          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
          />
        </div>

       <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>

          <input
            type="text"
            className="form-control"
            id="etag"
            value={note.etag}
            name="etag"
            onChange={onChange}
          />
        </div>      
      </form>
      </div>
      </div>
      <div className="modal-footer">
        <button ref={refClose}  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={addNotes} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="container my-3">
      <h2>Your Notes</h2>
        <div className="row my-3">
      {notes.map((note) => {
        return (
       <Notesitem key={note._id} updateNote={updateNote} note={note}></Notesitem>
         
        )})}
      </div>
      </div>
      
    </>
  )
}
