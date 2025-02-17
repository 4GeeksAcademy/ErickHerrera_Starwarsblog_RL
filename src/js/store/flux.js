const getState = ({ getStore, setStore }) => {
    return {
        store: {
            people: [],
            favorites: [],
            planets: [], 
        },
        actions: {
            fetchPeople: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people");
                    if (response.ok) {
                        const data = await response.json();
                        const peopleDetails = await Promise.all(
                            data.results.map(async (person) => {
                                const personResponse = await fetch(`https://www.swapi.tech/api/people/${person.uid}`);
                                if (personResponse.ok) {
                                    const personData = await personResponse.json();
                                    return {
                                        uid: person.uid,
                                        name: personData.result.properties.name,
                                        gender: personData.result.properties.gender,
                                        height: personData.result.properties.height,
                                        eye_color: personData.result.properties.eye_color,
                                    };
                                }
                                return null;
                            })
                        );
                        setStore({ people: peopleDetails.filter(p => p !== null) });
                    } else {
                        console.error("Error fetching people:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching people:", error);
                }
            },
            fetchPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets");
                    if (response.ok) {
                        const data = await response.json();
                        const planetsDetails = await Promise.all(
                            data.results.map(async (planet) => {
                                const planetResponse = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`);
                                if (planetResponse.ok) {
                                    const planetData = await planetResponse.json();
                                    return {
                                        uid: planet.uid,
                                        name: planetData.result.properties.name,
                                        diameter: planetData.result.properties.diameter,
                                        climate: planetData.result.properties.climate,
                                        terrain: planetData.result.properties.terrain
                                    };
                                }
                                return null;
                            })
                        );
                        setStore({ planets: planetsDetails.filter(p => p !== null) });
                    } else {
                        console.error("Error fetching planets:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching planets:", error);
                }
            },            

            toggleFavorite: (uid, name, type) => {
                const store = getStore();
                const newFavorites = store.favorites.some(fav => fav.uid === uid && fav.type === type)
                    ? store.favorites.filter(fav => !(fav.uid === uid && fav.type === type)) 
                    : [...store.favorites, { uid, name, type }];
                setStore({ favorites: newFavorites });
            },
            removeFavorite: (uid) => {
                const store = getStore();
                const newFavorites = store.favorites.filter(fav => fav.uid !== uid);
                setStore({ favorites: newFavorites });
            },
        }
    };
};

export default getState;
