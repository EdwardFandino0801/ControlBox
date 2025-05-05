import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.logo}>📚 Controlbox</h1>
            <nav style={styles.nav}>
                <Link to="/" style={styles.link}>Inicio</Link>
                {!user ? (
                    <>
                        <Link to="/login" style={styles.link}>Iniciar sesión</Link>
                        <Link to="/register" style={styles.link}>Registrarse</Link>
                    </>
                ) : (
                    <>
                        <Link to="/my-reviews" style={styles.link}>Mis Reseñas</Link>
                        <span style={styles.welcome}>Hola, {user.name}</span>
                        <button onClick={handleLogout} style={styles.button}>Cerrar sesión</button>
                    </>
                )}
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#f5f5f5',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        margin: 0,
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
    welcome: {
        marginRight: '10px',
        fontWeight: '500',
    },
};

export default Header;
