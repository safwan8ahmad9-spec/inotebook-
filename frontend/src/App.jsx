import './App.css';
import  {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from 'react';
import Navbar from './Components/Navbar.jsx';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import NotesState from './Context/NotesState.jsx';
import Alert from './Components/Alert.jsx';
 import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx'; 
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NotesState>
        <Navbar></Navbar>
        <Alert alert={alert} />
     
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </NotesState>
    </>
  );
}
export default App;