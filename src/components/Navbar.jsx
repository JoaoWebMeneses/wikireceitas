import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <Link to="/"><h2 id='wikireceitas'>WikiReceitas</h2></Link>
        </nav>
    )
}

export default Navbar;