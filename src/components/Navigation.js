import React from "react";
import {Link} from 'react-router-dom';
import './components.css';

function Navigation() {
    return (
        <div className="Navbar">
            <ul className="Links">
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/explore">
                        What's Buzzing?
                    </Link>
                </li>
                <li>
                    <Link to="/feed">
                        My favorites
                    </Link>
                </li>
                <li>
                    <Link to="/all">
                        All events
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation;