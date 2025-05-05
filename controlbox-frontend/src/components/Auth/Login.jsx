import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5008/api/auth/login', {
                email,
                password,
            });
            const { token, id, username } = response.data;
            login(token, { id, name: username }); // usamos la respuesta del backend

            navigate('/');
        } catch (err) {
            console.error('Error al iniciar sesión:', err);

            // Maneja errores devueltos por el backend
            if (err.response && err.response.data) {
                const backendError = err.response.data;

                if (typeof backendError === 'string') {
                    setErrorMessage(backendError);
                } else if (backendError.title) {
                    setErrorMessage(backendError.title);
                } else if (backendError.message) {
                    setErrorMessage(backendError.message);
                } else {
                    setErrorMessage("Error desconocido al iniciar sesión.");
                }
            } else {
                setErrorMessage("No se pudo conectar al servidor.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Iniciar Sesión</h2>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        marginBottom: '1rem',
        textAlign: 'center',
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
        textAlign: 'center',
    },
};

export default Login;