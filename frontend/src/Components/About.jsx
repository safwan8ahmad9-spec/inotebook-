import { useContext, useEffect } from 'react'
import NotesContext from '../Context/NotesContext'
export default function About() {
  const notes = useContext(NotesContext)
  useEffect(() => {
    notes.update()
  }, [])
  return (
    <div>
      <h1>About {notes.state.name} and {notes.state.class}</h1>
    </div>
  )
}
