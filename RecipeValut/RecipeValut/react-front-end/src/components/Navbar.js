import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className="nav-container">
      <div className="navBar">
      <Link className="navLink" to="/">RecipeValut</Link>

       <nav>
           <ul>
               <li>
                 <Link className="navLink" to="/Recipes">All Recipes</Link>
               </li>
               <li>
                 <Link className="navLink" to="/Login">Login</Link>
               </li>
               <li>
                 <Link className="navLink" to="/Register">Register</Link>
               </li>
           </ul>
       </nav>

       <form class="navForm">
           <input class="navInput" placeholder="Search..."/>
           <button>Search</button>
       </form>
      </div>
</div>
    );
}

export default Navbar;