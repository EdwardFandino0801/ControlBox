import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ReviewForm = ({ bookId }) => {
    const { token } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Debes iniciar sesión para dejar una reseña.");
            return;
        }

        console.log("🛂 Enviando reseña con token:", token ?? "Token no disponible");

        try {
            const res = await axios.post(
                'http://localhost:5008/api/reviews',
                { bookId, rating, comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Reseña enviada:', res.data);
        } catch (error) {
            console.error('Error al enviar reseña:', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded shadow w-full max-w-md bg-white">
            <label className="block font-semibold mb-1">Calificación:</label>
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min="1"
                max="5"
                required
                className="w-full border rounded p-2 mb-4"
            />

            <label className="block font-semibold mb-1">Comentario:</label>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full border rounded p-2 mb-4"
            />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Enviar reseña
            </button>
        </form>
    );
};

export default ReviewForm;
