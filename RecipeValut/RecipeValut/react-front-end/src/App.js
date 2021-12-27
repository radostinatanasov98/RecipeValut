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
import Recipes from './components/Recipes/Recipes.js';
import * as recipesService from './services/recipesService.js'
import Details from './components/Details/Details.js';

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
          <Route path="/Recipes" element={<Recipes recipes={recipesService.getAllRecipes()}/>}/>
          <Route path="/Details/:recipeId" element={<Details id={user.id} />}/>
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;