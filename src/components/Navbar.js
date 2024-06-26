import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Navbar() {
    let location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(location.pathname)
    }, [location]);

    const handleLogOut = () => {
        localStorage.removeItem('authtoken');
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"> iNotebook </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
                            </li>
                        </ul>


                        {!localStorage.getItem('authtoken') ?
                            <form className="d-flex">
                                <Link className="btn btn-primary mx-2" to="/Login" role="button">Log in</Link>
                                <Link className="btn btn-primary mx-2" to="/Signup" role="button">Sign up</Link>
                            </form>
                            : <button onClick={handleLogOut} type="button" className="btn btn-primary">Log out</button>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar