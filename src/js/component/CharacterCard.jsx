import React, { useContext } from "react";
import { Link } from "react-router-dom"; 
import { Context } from "../store/appContext";

const CharacterCard = ({ uid, name, gender, height, eyeColor, imageUrl }) => {
    const { store, actions } = useContext(Context);
    const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.type === "character");

    return (
        <div 
            className="card m-2"
            style={{
                minWidth: "400px",
                display: "inline-block",
                textAlign: "left"
            }}
        >
            <div 
                style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <img src={imageUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text"><strong>Gender:</strong> {gender}</p>
                <p className="card-text"><strong>Height:</strong> {height} cm</p>
                <p className="card-text"><strong>Eye Color:</strong> {eyeColor}</p>
                
                <div className="d-flex justify-content-between">
                    <Link to={`/character/${uid}`} className="btn btn-primary">Learn More</Link>
                    <button 
                        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`} 
                        onClick={() => actions.toggleFavorite(uid, name, "character")} 
                    >
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
