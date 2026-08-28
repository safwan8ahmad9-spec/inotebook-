import './App.css';
import  {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import NotesState from './Context/NotesState.jsx';
import Alert from './Components/Alert.jsx';
 import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx'; 
function App() {
  return (
    <>
      <NotesState>
        <Navbar></Navbar>
        <Alert message="This is a simple alert!" />
        <h1>iNotebook</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </NotesState>
    </>
  );
}
export default App;