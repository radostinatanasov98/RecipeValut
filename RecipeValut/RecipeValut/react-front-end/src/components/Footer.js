import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className="footerContainer">
            <ul className='footerUl'>
                <li className='footerLi'>
                <Link className="footerNavLink" to="/Contacts">Contacts</Link>
                </li>
                <li className='footerLi'>
                <Link className="footerNavLink" to="/About-Us">About Us</Link>
                </li>
            </ul>

            <p className='footerParagraph'>&copy; All rights reserved.</p>
        </div>
    );
}

export default Footer;