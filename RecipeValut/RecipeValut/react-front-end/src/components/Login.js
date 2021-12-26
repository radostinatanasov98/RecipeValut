import { Link } from 'react-router-dom';
import * as authService from '../services/authService.js';
import './Login.css';

const Login = ({onLogin}) => {
    const onFormSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let username = formData.get('Username');
        let password = formData.get('Password');

        authService.login(username, password)
        .then((authData) => {
            onLogin(authData);
        });
    }

    return (
        <>
        <h1 className='loginH1'>Login</h1>

        <div className='loginContainer'>
            <form className='innerLoginDiv' onSubmit={onFormSubmit}>
            <label className='loginLabel'>Username: </label>
            <input className='loginInput' id="Username" name="Username" type="text" placeholder="Enter username.."/>

            <label className='loginLabel'>Password: </label>
            <input className='loginInput' id="Password" name="Password" type="text" placeholder="Enter password.."/>

            <button className='loginBtn' type='submit'>Login</button>
            </form>
            <div className='registerPromtDiv'>
                Don't have an account? <Link to='/Register' className='registerPromtLink'>Register Now!</Link>
            </div>
        </div>
        </>
    );
}

export default Login;