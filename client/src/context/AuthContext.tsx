import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService, type User, type LoginCredentials, type RegisterCredentials } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const currentUser = authService.getCurrentUser();
        if (currentUser && authService.getToken()) {
            setUser(currentUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        const response = await authService.login(credentials);
        setUser({
            id: response.id,
            username: response.username,
            roles: response.roles
        });
    };

    const register = async (credentials: RegisterCredentials): Promise<void> => {
        await authService.register(credentials);
    };

    const logout = (): void => {
        authService.logout();
        setUser(null);
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.roles?.includes('ROLE_ADMIN') ?? false;

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
