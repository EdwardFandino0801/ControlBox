import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyReviews = () => {
    const { token } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editedRating, setEditedRating] = useState(1);

    const fetchReviews = async () => {
        try {
            const res = await fetch('http://localhost:5008/api/reviews/mine', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta reseña?')) return;

        try {
            const res = await fetch(`http://localhost:5008/api/reviews/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setReviews(reviews.filter(r => r.id !== id));
            }
        } catch (err) {
            console.error('Error deleting review:', err);
        }
    };

    const startEditing = (review) => {
        setEditingReview(review.id);
        setEditedComment(review.comment);
        setEditedRating(review.rating);
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:5008/api/reviews/${editingReview}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ comment: editedComment, rating: editedRating })
            });
            if (res.ok) {
                await fetchReviews();
                setEditingReview(null);
            }
        } catch (err) {
            console.error('Error updating review:', err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Mis Reseñas</h2>
            {reviews.length === 0 ? (
                <p>No has escrito ninguna reseña todavía.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {reviews.map(review => (
                        <li key={review.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                            {editingReview === review.id ? (
                                <>
                                    <label>
                                        Calificación:
                                        <select
                                            value={editedRating}
                                            onChange={(e) => setEditedRating(Number(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5].map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <br />
                                    <textarea
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                        rows={3}
                                        cols={40}
                                    />
                                    <br />
                                    <button onClick={handleUpdate}>Guardar</button>
                                    <button onClick={() => setEditingReview(null)}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    <strong>Libro:</strong>{review.bookTitle}<br />
                                    <strong>Calificación:</strong> {review.rating} <br />
                                    <strong>Comentario:</strong> {review.comment} <br />
                                    <button onClick={() => startEditing(review)}>Editar</button>
                                    <button onClick={() => handleDelete(review.id)}>Eliminar</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyReviews;
