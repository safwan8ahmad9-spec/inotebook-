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
  
function App() {
  return (
    <>
      <NotesState>
        <Navbar></Navbar>
        <h1>iNotebook</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </NotesState>
    </>
  );
}
export default App;