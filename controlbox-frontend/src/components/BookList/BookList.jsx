import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5008/api/books')
            .then(res => setBooks(res.data))
            .catch(err => console.error('Error al obtener libros', err));
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>📚 Lista de Libros</h2>
            <input
                type="text"
                placeholder="Buscar por título, autor o categoría"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', marginBottom: '16px', width: '100%' }}
            />
         
            <ul>
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        <Link to={`/books/${book.id}`}>{book.title}</Link> – {book.author} ({book.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
