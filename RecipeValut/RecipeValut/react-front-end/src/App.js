import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';
import Footer from './components/Footer.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import CreateRecipe from './components/CreateRecipe.js';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={Landing()}/>
          <Route path="/Login" element={Login()}/>
          <Route path="/Register" element={Register()}/>
          <Route path="/Create-Recipe" element={CreateRecipe()}/>
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;