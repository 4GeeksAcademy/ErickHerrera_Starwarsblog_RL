import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const CharacterDetail = () => {
    const { uid } = useParams(); 
    const { store } = useContext(Context);
    const [character, setCharacter] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const characterDetails = store.people.find(person => person.uid === uid);
        if (characterDetails) {
            setCharacter(characterDetails);
        } else {
            navigate("/"); 
        }
    }, [uid, store.people, navigate]);

    if (!character) return <p>Loading...</p>;
    const characterImages = {
        "Luke Skywalker": "https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_7ffe21c7.jpeg?region=130%2C147%2C1417%2C796",
        "C-3PO": "https://lumiere-a.akamaihd.net/v1/images/c-3po-main_d6850e28.jpeg?region=176%2C0%2C951%2C536",
        "R2-D2": "https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_f315b094.jpeg?region=273%2C0%2C951%2C536",
        "Darth Vader": "https://wallpapers.com/images/featured/darth-vader-pictures-qwlyfdkmyjirchwo.jpg",
        "Leia Organa": "https://images.fun.com/blog/images/615/2130-1/princess-leia-organa.jpg",
    };

    const imageUrl = characterImages[character.name] || '';

    return (
        <div className="container mt-4" style={{ padding: "0 10px" }}>
            <div 
                className="card mb-4"
                style={{
                    width: "100%", 
                    height: "80vh",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "row",
                    boxSizing: "border-box"
                }}
            >
                <div className="col-md-4" style={{ maxWidth: "40%", minWidth: "200px" }}>
                    <img
                        src={imageUrl} 
                        alt={character.name}
                        className="card-img"
                        style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover" 
                        }}
                    />
                </div>
                <div className="col-md-8" style={{ paddingLeft: "20px" }}>
                    <div 
                        className="card-body" 
                        style={{ 
                            height: "100%", 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "space-between" 
                        }}
                    >
                        <h5 className="card-title">{character.name}</h5>
                        <p className="card-text"><strong>Gender:</strong> {character.gender}</p>
                        <p className="card-text"><strong>Height:</strong> {character.height} cm</p>
                        <p className="card-text"><strong>Eye Color:</strong> {character.eye_color}</p>
                        <p className="card-text"><strong>Description:</strong>{character.name} is a person within the Star Wars universe.</p>
                        <button className="btn btn-secondary" onClick={() => navigate("/")}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;
