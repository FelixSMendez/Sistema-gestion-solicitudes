import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Verifica si existe un usuario y su token
    useEffect(() =>{
        const token = localStorage.getItem('token');
        const usuarioS = localStorage.getItem('user');

        if(token && usuarioS){
            setUser(JSON.parse(usuarioS));
        }
        setLoading(false);
    }, []);

    //funcion de login
    const login = async (email, password) => {
        try{
            const response = await api.post('/login', {email, password});
            const {token, user} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return response.data;
        } catch (error){
            console.error('Error during login:', error);
            throw error;
        }
    };

    //funcion de logout
    const logout = async () => {
        try{
            await api.post('/logout');
        } catch (error){
            console.error('Error al cerrar la sesión:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};