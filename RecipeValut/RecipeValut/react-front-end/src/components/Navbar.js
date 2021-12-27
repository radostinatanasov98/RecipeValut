import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({id}) => {
  const defaultNav = (
    <>
                <li>
              <Link className="navLink" to="/Recipes">All Recipes</Link>
            </li>
            </>
  );

  const guestNav = (
    <div>
        {defaultNav}
      <li>
        <Link className="navLink" to="/Login">Login</Link>
      </li>
      <li>
        <Link className="navLink" to="/Register">Register</Link>
      </li>
    </div>
  );

  const userNav = (
    <div>
        {defaultNav}
      <li>
        <Link className="navLink" to="/Create-Recipe">Add Recipe</Link>
      </li>
      <li>
        <Link className="navLink" to="/Profile">My Profile</Link>
      </li>
      <li>
        <Link className="navLink" to="/Logout">Logout</Link>
      </li>
    </div>
  );

    return (
      <div className="nav-container">
      <div className="navBar">
      <Link className="navLink" to="/">RecipeValut</Link>

       <nav>
           <ul>
              {id ? userNav : guestNav}
           </ul>
       </nav>

       <div className="navForm">
           <input className="navInput" placeholder="Search..."/>
           <button>Search</button>
       </div>
      </div>
</div>
    );
}

export default Navbar;