import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js'
import Navbar from './components/Navbar.js'

function App() {
  return (
    <>
    <Navbar/>
    <Home image={logo}/>
    </>
   
  );
}

export default App;
