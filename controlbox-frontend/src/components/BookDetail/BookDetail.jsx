import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../ReviewForm/ReviewForm';
import { AuthContext } from '../../context/AuthContext';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:5008/api/books/${id}`);
                setBook(res.data);
            } catch (error) {
                console.error('Error al obtener detalles del libro', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:5008/api/reviews/book/${id}`);
                setReviews(res.data);
            } catch (error) {
                console.error('Error al obtener reseñas del libro', error);
            }
        };

        fetchBook();
        fetchReviews();
    }, [id]);

    const handleReviewSubmitted = async () => {
        // Recargar reseñas al enviar una nueva
        try {
            const res = await axios.get(`http://localhost:5008/api/reviews/book/${id}`);
            setReviews(res.data);
        } catch (error) {
            console.error('Error al refrescar reseñas', error);
        }
    };

    if (!book) return <p>Cargando...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>{book.title}</h2>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Categoría:</strong> {book.category}</p>
            <p><strong>Resumen:</strong> {book.summary}</p>

            <h3>Reseñas:</h3>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <p><strong>Calificación:</strong> {review.rating}</p>
                            <p><strong>Comentario:</strong> {review.comment}</p>
                            <p><strong>Usuario:</strong> {review.user?.username}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay reseñas para este libro.</p>
            )}

            {token && (
                <ReviewForm bookId={id} onReviewSubmitted={handleReviewSubmitted} />
            )}
        </div>
    );
};

export default BookDetail;
