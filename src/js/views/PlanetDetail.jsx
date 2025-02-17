import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const PlanetDetail = () => {
    const { uid } = useParams(); 
    const { store } = useContext(Context);
    const [planet, setPlanet] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const planetDetails = store.planets.find(planet => planet.uid === uid);
        if (planetDetails) {
            setPlanet(planetDetails);
        } else {
            navigate("/"); 
        }
    }, [uid, store.planets, navigate]);

    if (!planet) return <p>Loading...</p>;
    const planetImages = {
        "Tatooine": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/4/4b/Tatooine-3.jpg",
        "Alderaan": "https://static.wikia.nocookie.net/theclonewiki/images/f/f2/Alderaan_0.jpg/revision/latest?cb=20180520151221",
        "Yavin IV": "https://static.wikia.nocookie.net/starwars/images/6/69/Yavin4.jpg/revision/latest?cb=20200326211857",
        "Hoth": "https://static.wikia.nocookie.net/starwars/images/4/41/Hoth_TOR_New.png/revision/latest?cb=20200411083418",
        "Dagobah": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/6/68/Dagobah_2.jpg",
    };

    const imageUrl = planetImages[planet.name] || '';

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
                    padding: "15px", 
                    boxSizing: "border-box"
                }}
            >
                <div className="col-md-4" style={{ maxWidth: "40%", minWidth: "200px" }}>
                    <img
                        src={imageUrl} 
                        alt={planet.name}
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
                        <h5 className="card-title">{planet.name}</h5>
                        <p className="card-text"><strong>Diameter:</strong> {planet.diameter}</p>
                        <p className="card-text"><strong>Climate:</strong> {planet.climate}</p>
                        <p className="card-text"><strong>Terrain:</strong> {planet.terrain}</p>
                        <p className="card-text"><strong>Description:</strong> This is a brief description of {planet.name}.</p>
                        <button className="btn btn-secondary" onClick={() => navigate("/")}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetDetail;
