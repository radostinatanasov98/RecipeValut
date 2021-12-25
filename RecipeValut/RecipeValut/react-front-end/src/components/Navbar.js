import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <Link className='navbar-brand nav-element home-page-link' to="/">RecipeValut</Link>

  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-element">
        <Link className='navbar-brand' to="/Recipes">All Recipes</Link>
      </li>
      <li className="nav-element">
        <Link className='navbar-brand' to="/Login">Login</Link>
      </li>
      <li className="nav-element">
      <Link className='navbar-brand' to="/Register">Register</Link>
      </li>
    </ul>

    <div className="navbar-right">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0 nav-element">Search</button>
    </div>
  </div>
</nav>
    );
}

export default Navbar;