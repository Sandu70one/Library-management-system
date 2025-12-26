import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutModal from './LogoutModal';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, isAdmin, logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        logout();
        setShowLogoutModal(false);
        navigate('/login');
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    const getRoleBadge = () => {
        if (isAdmin) {
            return <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">ADMIN</span>;
        }
        return <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">USER</span>;
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <span className="brand-icon">📚</span>
                        Library Management System
                    </Link>
                    <div className="navbar-links">
                        {isAuthenticated ? (
                            <>
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                                {isAdmin && (
                                    <Link to="/add-book" className="nav-link">
                                        Add Book
                                    </Link>
                                )}
                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium text-gray-700">
                                            {user?.username}
                                        </span>
                                        {getRoleBadge()}
                                    </div>
                                    <button
                                        onClick={handleLogoutClick}
                                        className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />
        </>
    );
};

export default Navbar;
