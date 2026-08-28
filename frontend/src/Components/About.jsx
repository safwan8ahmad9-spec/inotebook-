import { useContext, useEffect } from 'react'
import NotesContext from '../Context/NotesContext'
export default function About() {
  const notes = useContext(NotesContext)
  
  return (
    <div>
      <h1>About Notes</h1>
    </div>
  )
}
