import api from '../api/axiosConfig';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
    role: string[];
}

export interface AuthResponse {
    token: string;
    type: string;
    id: string;
    username: string;
    roles: string[];
}

export interface User {
    id: string;
    username: string;
    roles: string[];
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/signin', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                username: response.data.username,
                roles: response.data.roles
            }));
        }
        return response.data;
    },

    register: async (credentials: RegisterCredentials): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/auth/signup', credentials);
        return response.data;
    },

    logout: (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    getToken: (): string | null => {
        return localStorage.getItem('token');
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },

    isAdmin: (): boolean => {
        const user = authService.getCurrentUser();
        return user?.roles?.includes('ROLE_ADMIN') ?? false;
    }
};
