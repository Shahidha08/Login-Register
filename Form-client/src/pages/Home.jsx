import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function NavLinks() {
    return (
        <>
        <h1>Home</h1>
        <div className="nav-container">
            <nav>
                <Link to="/login">Login</Link><br/><br/>
                <Link to="/register">Register</Link>
            </nav>
        </div>
        </>
    );
}

export default NavLinks;