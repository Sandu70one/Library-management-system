import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">📚</span>
                    Library Management System
                </Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/add-book" className="nav-link">
                        Add Book
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
