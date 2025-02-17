import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import CharacterCard from "../component/CharacterCard.jsx";
import PlanetCard from "../component/PlanetCard.jsx"; 

const MainView = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchPeople();
        actions.fetchPlanets();
    }, []);
    const characterImages = {
        "Luke Skywalker": "https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_7ffe21c7.jpeg?region=130%2C147%2C1417%2C796",
        "C-3PO": "https://lumiere-a.akamaihd.net/v1/images/c-3po-main_d6850e28.jpeg?region=176%2C0%2C951%2C536",
        "R2-D2": "https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_f315b094.jpeg?region=273%2C0%2C951%2C536",
        "Darth Vader":"https://wallpapers.com/images/featured/darth-vader-pictures-qwlyfdkmyjirchwo.jpg",
        "Leia Organa":"https://images.fun.com/blog/images/615/2130-1/princess-leia-organa.jpg",
    };
    const planetImages = {
        "Tatooine": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/4/4b/Tatooine-3.jpg",
        "Alderaan": "https://static.wikia.nocookie.net/theclonewiki/images/f/f2/Alderaan_0.jpg/revision/latest?cb=20180520151221",
        "Yavin IV": "https://static.wikia.nocookie.net/starwars/images/6/69/Yavin4.jpg/revision/latest?cb=20200326211857",
        "Hoth":"https://static.wikia.nocookie.net/starwars/images/4/41/Hoth_TOR_New.png/revision/latest?cb=20200411083418",
        "Dagobah":"https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/6/68/Dagobah_2.jpg",
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Star Wars Characters</h2>
            <div 
                className="d-flex overflow-auto"
                style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    paddingBottom: "10px"
                }}
            >
                {store.people.length > 0 ? (
                    store.people.map((person) => {
                        const imageUrl = characterImages[person.name] || 'url-a-placeholder'; 
                        return (
                            <CharacterCard 
                                key={person.uid}
                                uid={person.uid}
                                name={person.name}
                                gender={person.gender}
                                height={person.height}
                                eyeColor={person.eye_color}
                                imageUrl={imageUrl}  
                            />
                        );
                    })
                ) : (
                    <p>Loading characters...</p>
                )}
            </div>

            <h2 className="text-center my-4">Star Wars Planets</h2>
            <div 
                className="d-flex overflow-auto"
                style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    paddingBottom: "10px"
                }}
            >
                {store.planets.length > 0 ? (
                    store.planets.map((planet) => {
                        const imageUrl = planetImages[planet.name] || 'url-a-placeholder'; 
                        return (
                            <PlanetCard 
                                key={planet.uid}
                                uid={planet.uid}
                                name={planet.name}
                                diameter={planet.diameter}
                                climate={planet.climate}
                                terrain={planet.terrain}
                                imageUrl={imageUrl} 
                            />
                        );
                    })
                ) : (
                    <p>Loading planets...</p>
                )}
            </div>
        </div>
    );
};

export default MainView;
