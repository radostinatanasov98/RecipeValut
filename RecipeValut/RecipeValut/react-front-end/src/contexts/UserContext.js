import { createContext, useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import * as authService from '../services/authService.js'

const initialState = {
    id: ''
};

export const UserContext = createContext();

export const useUserContext = () => {
    const userState = useContext(UserContext);

    return userState;
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialState);

    const login = (username, password) => {
        authService.login(username, password)
        .then((authData) => {
            if (authData.response == 'Invalid username or password.') {
                return;
            }
            setUser(authData);
        });
    }

    const logout = () => {
        setUser(initialState);
    };

    return (
        <UserContext.Provider value={{ login, logout, id: user.id }}>
            {children}
        </UserContext.Provider>
    );
}