import axios from 'axios';
import type { Book, BookFormData } from '../types/Book';

const API_URL = 'http://localhost:5000/api/books';

export const bookService = {
    // Get all books
    getAllBooks: async (): Promise<Book[]> => {
        const response = await axios.get<Book[]>(API_URL);
        return response.data;
    },

    // Get a single book by ID
    getBookById: async (id: number): Promise<Book> => {
        const response = await axios.get<Book>(`${API_URL}/${id}`);
        return response.data;
    },

    // Add a new book
    addBook: async (book: BookFormData): Promise<Book> => {
        const response = await axios.post<Book>(API_URL, book);
        return response.data;
    },

    // Update an existing book
    updateBook: async (id: number, book: BookFormData): Promise<Book> => {
        const response = await axios.put<Book>(`${API_URL}/${id}`, book);
        return response.data;
    },

    // Delete a book
    deleteBook: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
};
