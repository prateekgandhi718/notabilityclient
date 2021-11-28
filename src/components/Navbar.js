import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext'

const Navbar = () => {

    let history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login')
    }
    let location = useLocation();

    const context = useContext(noteContext);
    const { user, getUser } = context;
    

    const onUserClick = () => {
        if (localStorage.getItem('token')) {
            getUser()
            
        }
        else {
            history.push('/login')
        }
    }






    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Notabilty on Cloud</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-primary mx-4" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-4" to="/signup" role="button">Sign up</Link>
                        </form> : <><div className="btn-group" style={{marginRight: "21rem"}} >
                            <button type="button" className="btn btn-dark dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false" onClick={onUserClick} style={{ color: "whitesmoke" }}>
                            <i className="fas fa-portrait"></i>
                            </button>
                            <ul className="dropdown-menu" >
                                <li className="dropdown-item" style={{ cursor: "pointer" }}>Name: {user.name} </li>
                                <li className="dropdown-item" style={{ cursor: "pointer" }}>Email: {user.email}  </li>
                                <li className="dropdown-item" style={{ cursor: "pointer" }}>Happy note taking!</li>
                            </ul>
                        </div><button onClick={handleLogout} className="btn btn-primary mx-4">Logout</button></>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar


/* NOTES

1. Directly write rafce to get the snippet of react functional based component with export


2. {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>
                        </form>: <button className="btn btn-primary">Logout</button>}

this basically means that when there is no token present in the localStorage, just show log in and sign up. Else show log out.

*/