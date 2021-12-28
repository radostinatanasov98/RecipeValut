import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import CreateRecipe from './components/CreateRecipe/CreateRecipe.js';
import Logout from './components/Logout/Logout.js'
import './App.css';
import Recipes from './components/Recipes/Recipes.js';
import * as recipesService from './services/recipesService.js'
import Details from './components/Details/Details.js';
import Edit from './components/Edit/Edit.js'
import { UserProvider } from './contexts/UserContext.js';
import LikedRecipes from './components/LikedRecipes/LikedRecipes.js';

function App() {
  return (
    <UserProvider>
    <div>
      <header>
        <Navbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={Landing()}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Logout" element={<Logout/>}/>
          <Route path="/Register" element={Register()}/>
          <Route path="/Create-Recipe" element={<CreateRecipe/>}/>
          <Route path="/Details/:recipeId" element={<Details/>}/>
          <Route path="/Edit/:recipeId" element={<Edit/>}/>
          <Route path="/Recipes" element={<Recipes r={recipesService.getAllRecipes().then(r => {return  r.json()})}/>}/>
          <Route path="/Liked-Recipes" element={<LikedRecipes/>}/>
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
    </UserProvider>
  );
}

export default App;