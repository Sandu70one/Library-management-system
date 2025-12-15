export interface Book {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    genre: string;
    copiesAvailable: number;
}

export interface BookFormData {
    title: string;
    author: string;
    publicationYear: number;
    genre: string;
    copiesAvailable: number;
}
