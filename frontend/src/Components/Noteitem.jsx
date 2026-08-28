import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/NotesContext.jsx'
export default function Noteitem(props) {
   
    const { deleteNote } = useContext(noteContext);
    const { note, updateNote } = props;
    
  return (
    <div className="col md-3 mb-3">      
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body d-flex flex-column">
         <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title">{note.title}</h5>
           <i className="bi bi-trash3-fill" onClick={()=>{deleteNote(note._id);props.showAlert("Note deleted successfully", "success");}} style={{ cursor: "pointer" }}></i>
           <i className="bi bi-pencil-square" onClick={() => {updateNote(note)
            ;props.showAlert("Note updated successfully", "success")
           }} style={{ cursor: "pointer" }}></i>
            </div>
          <p className="card-text mt-2">{note.description}</p>
          </div>
          </div>
          </div>
        
     
  )
}
