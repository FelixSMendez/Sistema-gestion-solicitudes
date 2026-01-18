import axios from 'axios';

// Configura la instancia de axios con la URL base y los encabezados predeterminados
const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Intercepta la peticion para agregar el token de autorizacion
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            // Redirigir al login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;