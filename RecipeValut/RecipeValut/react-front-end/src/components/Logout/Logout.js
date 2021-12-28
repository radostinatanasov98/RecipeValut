import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { useUserContext } from '../../contexts/UserContext.js';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useUserContext();

    useEffect(() => {
        logout();
        navigate('/');
    }, [])

    return null;
};

export default Logout;