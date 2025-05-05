// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5008'; // Asegúrate de que esta URL coincida con tu backend

export const getBooks = async () => {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
};

export const getBookDetails = async (id) => {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
};

export const getReviews = async (bookId) => {
    const response = await axios.get(`${API_URL}/books/${bookId}/reviews`);
    return response.data;
};

export const createReview = async (bookId, reviewData, token) => {
    const response = await axios.post(`${API_URL}/books/${bookId}/reviews`, reviewData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
