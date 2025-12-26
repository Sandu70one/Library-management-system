import api from '../api/axiosConfig';
import type { Book, BookFormData } from '../types/Book';

export const bookService = {
    // Get all books
    getAllBooks: async (): Promise<Book[]> => {
        const response = await api.get<Book[]>('/books');
        return response.data;
    },

    // Get a single book by ID
    getBookById: async (id: number): Promise<Book> => {
        const response = await api.get<Book>(`/books/${id}`);
        return response.data;
    },

    // Add a new book
    addBook: async (book: BookFormData): Promise<Book> => {
        const response = await api.post<Book>('/books', book);
        return response.data;
    },

    // Update an existing book
    updateBook: async (id: number, book: BookFormData): Promise<Book> => {
        const response = await api.put<Book>(`/books/${id}`, book);
        return response.data;
    },

    // Delete a book
    deleteBook: async (id: number): Promise<void> => {
        await api.delete(`/books/${id}`);
    }
};
