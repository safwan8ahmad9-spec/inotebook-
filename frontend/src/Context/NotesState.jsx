import react from 'react'
import NotesContext from './NotesContext'
const NotesState =(props)=>{

  const[notes,setNotes]=react.useState(   [{    
  "_id": "6a8fe1d6afbed8234ac29975",
  "user":"6a8fe1d6afbed8234ac29974",
  "title": "my note ss title",
  "description": "my note description",
  "tag": "General",
  "date": "2026-08-27T07:05:58.429Z",
  "__v": 0
} ]   )
    return(
        <NotesContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}
export default NotesState