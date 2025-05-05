import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookList from './components/BookList/BookList';
import BookDetail from './components/BookDetail/BookDetail';
import ReviewForm from './components/ReviewForm/ReviewForm';
import ReviewList from './components/ReviewList/ReviewList';
import Header from './components/Header';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import MyReviews from './components/ReviewList/MyReviews';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetail />} />

                {/* Rutas protegidas */}
                <Route
                    path="/books/:id/review"
                    element={
                        <ProtectedRoute>
                            <ReviewForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reviews"
                    element={
                        <ProtectedRoute>
                            <ReviewList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-reviews"
                    element={
                        <ProtectedRoute>
                            <MyReviews />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
