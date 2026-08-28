import React from 'react'
import Notes from './Notes.jsx'
import AddNotes from './AddNotes.jsx'
export default function Home(props) {
 const {showAlert} = props;
      return (
    <>
      <AddNotes showAlert={showAlert}></AddNotes>
    <Notes showAlert={showAlert}></Notes>
    </>
  )
}