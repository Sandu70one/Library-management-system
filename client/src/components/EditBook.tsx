import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { BookFormData } from '../types/Book';
import { bookService } from '../services/bookService';
import './BookForm.css';

const EditBook = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        author: '',
        publicationYear: new Date().getFullYear(),
        genre: '',
        copiesAvailable: 1
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            fetchBook();
        }
    }, [id]);

    const fetchBook = async () => {
        try {
            setLoading(true);
            const book = await bookService.getBookById(parseInt(id!));
            setFormData({
                title: book.title,
                author: book.author,
                publicationYear: book.publicationYear,
                genre: book.genre,
                copiesAvailable: book.copiesAvailable
            });
            setError('');
        } catch (err) {
            setError('Failed to fetch book details');
            console.error('Error fetching book:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'publicationYear' || name === 'copiesAvailable'
                ? parseInt(value) || 0
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.title || !formData.author || !formData.genre) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.publicationYear < 1000 || formData.publicationYear > new Date().getFullYear()) {
            setError('Please enter a valid publication year');
            return;
        }

        if (formData.copiesAvailable < 0) {
            setError('Copies available cannot be negative');
            return;
        }

        setSubmitting(true);

        try {
            await bookService.updateBook(parseInt(id!), formData);
            setSuccess('Book updated successfully!');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            setError('Failed to update book. Please try again.');
            console.error('Error updating book:', err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading book details...</div>;
    }

    return (
        <div className="container">
            <div className="form-header">
                <h1>Edit Book</h1>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                >
                    ← Back to List
                </button>
            </div>

            <div className="card form-card">
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter book title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author" className="form-label">
                            Author <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="form-control"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="publicationYear" className="form-label">
                                Publication Year <span className="required">*</span>
                            </label>
                            <input
                                type="number"
                                id="publicationYear"
                                name="publicationYear"
                                className="form-control"
                                value={formData.publicationYear}
                                onChange={handleChange}
                                min="1000"
                                max={new Date().getFullYear()}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="copiesAvailable" className="form-label">
                                Copies Available <span className="required">*</span>
                            </label>
                            <input
                                type="number"
                                id="copiesAvailable"
                                name="copiesAvailable"
                                className="form-control"
                                value={formData.copiesAvailable}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre" className="form-label">
                            Genre <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            className="form-control"
                            value={formData.genre}
                            onChange={handleChange}
                            placeholder="e.g., Fiction, Mystery, Science, etc."
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={submitting}
                        >
                            {submitting ? 'Updating...' : '✓ Update Book'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/')}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
