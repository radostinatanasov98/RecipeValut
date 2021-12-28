import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.js';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUserContext();

    const onFormSubmit = (e) => {
        e.preventDefault();

        let { username, password } = Object.fromEntries(new FormData(e.currentTarget));

        login(username, password);

        navigate('/Recipes');
    }

    return (
        <>
        <h1 className='loginH1'>Login</h1>

        <div className='loginContainer'>
            <form className='innerLoginDiv' onSubmit={onFormSubmit}>
            <label className='loginLabel'>Username: </label>
            <input className='loginInput' id="username" name="username" type="text" placeholder="Enter username.."/>

            <label className='loginLabel'>Password: </label>
            <input className='loginInput' id="password" name="password" type="text" placeholder="Enter password.."/>

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