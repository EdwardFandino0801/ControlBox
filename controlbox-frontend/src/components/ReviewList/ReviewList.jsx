import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h3>Reseñas</h3>
            <ul>
                {reviews.map((review) => (
                    <div key={review.id} className="review">
                        <p><strong>{review.username}</strong> calificó con {review.rating} estrellas</p>
                        <p>{review.comment}</p>
                        <small>{new Date(review.dateCreated).toLocaleString()}</small>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
