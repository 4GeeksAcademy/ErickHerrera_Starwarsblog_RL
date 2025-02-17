import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link to="/">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" 
                    alt="Star Wars Logo" 
                    style={{ height: "50px" }}
                />
            </Link>
            <div className="dropdown">
                <button 
                    className="btn btn-warning dropdown-toggle" 
                    type="button" 
                    id="favoritesDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    Favorites ({store.favorites.length})
                </button>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                    {store.favorites.length > 0 ? (
                        store.favorites.map((fav, index) => (
                            <li key={index} className="dropdown-item d-flex justify-content-between">
                                {fav.name} <small>({fav.type})</small> 
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => actions.toggleFavorite(fav.uid, fav.name, fav.type)}
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-item text-muted">No favorites added</li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
