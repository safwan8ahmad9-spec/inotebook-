import React from 'react'
import notesContext from '../Context/NotesContext.jsx'
import { useContext } from 'react'
export default function AddNotes() {
    const {addNote} = useContext(notesContext);
    const [note, setNote] = React.useState({title:"", description:"", tag:"genral"});
    const addNotes = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }
     const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <div className="container my-3">
      <form>
        <div className="mb-3 ">
          <label htmlFor="title"  className="form-label">
           Title
          </label>

          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />

          <div id="emailHelp" className="form-text">
            We'll never share your notes with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>

       <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>

          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>


        <button type="submit"  onClick={addNotes} className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
    </div>
  )
}
