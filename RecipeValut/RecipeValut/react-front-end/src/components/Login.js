import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    return (
        <>
        <h1 className='loginH1'>Login</h1>

        <div className='loginContainer'>
            <div className='innerLoginDiv'>
            <label className='loginLabel'>Username: </label>
            <input className='loginInput' type="text" placeholder="Enter username.."/>
            <label className='loginLabel'>Password: </label>
            <input className='loginInput' type="text" placeholder="Enter password.."/>
            <button className='loginBtn'>Login</button>
            </div>
            <div class='registerPromtDiv'>
                Don't have an account? <Link to='/Register' className='registerPromtLink'>Register Now!</Link>
            </div>
        </div>
        </>
    );
}

export default Login;