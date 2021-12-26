import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';
import Footer from './components/Footer.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import CreateRecipe from './components/CreateRecipe.js';
import Logout from './components/Logout/Logout.js'
import './App.css';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    id: ''
  });

  const onLogin = (authData) => {
    setUser(authData);
  };

  const onLogout = () => {
    setUser({id: ''});
  }

  return (
    <div>
      <header>
        <Navbar id={user.id}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={Landing()}/>
          <Route path="/Login" element={<Login onLogin={onLogin}/>}/>
          <Route path="/Logout" element={<Logout onLogout={onLogout}/>}/>
          <Route path="/Register" element={Register()}/>
          <Route path="/Create-Recipe" element={<CreateRecipe id={user.id}/>}/>
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;