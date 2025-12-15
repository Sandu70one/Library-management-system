import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../types/Book';
import { bookService } from '../services/bookService';
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const data = await bookService.getAllBooks();
            setBooks(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch books. Please make sure the server is running.');
            console.error('Error fetching books:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await bookService.deleteBook(id);
                setBooks(books.filter(book => book.id !== id));
            } catch (err) {
                setError('Failed to delete book');
                console.error('Error deleting book:', err);
            }
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/edit-book/${id}`);
    };

    if (loading) {
        return <div className="loading">Loading books...</div>;
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Library Books</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/add-book')}
                >
                    ➕ Add New Book
                </button>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            {books.length === 0 ? (
                <div className="card">
                    <p className="empty-state">
                        No books found. Add your first book to get started!
                    </p>
                </div>
            ) : (
                <div className="card">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Year</th>
                                    <th>Genre</th>
                                    <th>Copies</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td className="book-title">{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publicationYear}</td>
                                        <td>
                                            <span className="genre-badge">{book.genre}</span>
                                        </td>
                                        <td>
                                            <span className="copies-badge">
                                                {book.copiesAvailable}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleEdit(book.id)}
                                                    className="btn btn-sm btn-secondary"
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(book.id, book.title)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
