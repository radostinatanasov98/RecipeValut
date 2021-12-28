import { Link } from 'react-router-dom';
import { register } from '../../services/authService.js';
import './Register.css';

function Register() {
    const onFormSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let username = formData.get('Username');
        let password = formData.get('Password');

        register(username, password);
    }

    return (
        <>
        <h1 className='registerH1'>Register</h1>

        <div className='registerContainer'>
            <form className='innerRegisterDiv' onSubmit={onFormSubmit}>
            <label className='registerLabel'>Username: </label>
            <input className='registerInput'id="Username" name="Username" type="text" placeholder="Enter username.."/>

            <label className='registerLabel'>Password: </label>
            <input className='registerInput' id="Password" name="Password" type="text" placeholder="Enter password.."/>

            <label className='registerLabel'>Confirm Password: </label>
            <input className='registerInput' id="RePassword" name="RePassword" type="text" placeholder="Re-Enter password.."/>

            <button className='registerBtn' type='submit'>Register</button>
            </form>
            <div className='loginPromtDiv'>
                Already have an account? <Link to='/Login' className='loginPromtLink'>Login Now!</Link>
            </div>
        </div>
        </>
    );
}

export default Register;