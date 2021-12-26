import { useNavigate } from 'react-router-dom';

const Logout = ({onLogout}) => {
    const navigate = useNavigate();

    onLogout();
    navigate('/');

    return null;
};

export default Logout;