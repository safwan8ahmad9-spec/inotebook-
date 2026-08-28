import React from 'react'
import notesContext from '../Context/NotesContext.jsx'
import { useContext } from 'react'
export default function AddNotes() {
    const {addNote} = useContext(notesContext);
    const [note, setNote] = React.useState({title:"", description:"", tag:""});
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
            minLength={5} required
            value={note.title}
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
            minLength={5} required
            name="description"
            onChange={onChange}
            value={note.description}
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
            minLength={3} required
            onChange={onChange}
            value={note.tag}
          />
        </div>



        <button type="submit" disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3}  onClick={addNotes} className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
    </div>
  )
}
