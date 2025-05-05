// src/components/Auth/ProtectedRoute.jsx
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // Si el usuario no está autenticado, lo redirigimos a la página de login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, mostramos los componentes hijos (las rutas privadas)
    return children;
};

export default ProtectedRoute;