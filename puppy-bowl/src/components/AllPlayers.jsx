import SinglePlayer from "./SinglePlayer"
import { useEffect, useState } from "react";
import { getPlayers, deletePlayer, addPlayer } from "../api";
import { Link } from "react-router-dom";

export default function AllPlayers({ name, setName, breed, setBreed }) {
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function getData() {
            setPlayers(await getPlayers());
        }
        getData();
    }, []);

    // I wanna make a filter array method that filters the players array by a specific key word or search key word. This key word will be a useState will be updated by the user's input. As user types the state of the useState will atomatically update in real time. 
    const filteredPlayers = players.filter((player) => player.name.includes(searchKeyWord));

    const handleDelete = async (playerId) => {
        try {
            await deletePlayer(playerId);
            setPlayers(players.filter(player => player.id !== playerId));
        } catch (error) {
            console.error("Failed to delete player", error);
        }
    };


    // Write the function here
    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !breed) {
            alert("Please complete fields.");
            return;
        }

        const newPlayer = { name, breed };

        try {
            const addedPlayer = await addPlayer(newPlayer);
            if (addedPlayer) {
                players.unshift (addedPlayer)
                setPlayers(players);
                setName("");
                setBreed("");
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    return (
        <div className="all-players-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {/* Submit button for example, and inputs */}
                <input
                    type="text"
                    placeholder='Breed'
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                <button type="submit"> Add Player Here</button>
            </form>
            <input
                type="text"
                className="search-bar"
                placeholder="Search players..."
                value={searchKeyWord}
                onChange={(e) => setSearchKeyWord(e.target.value)}
            />

            {filteredPlayers.map((player) => (
                <div key={player.id} className="player-card">
                    <SinglePlayer player={player} />
                    <Link to={`/player/${player.id}`}>
                        <button className="details-btn">See Details</button>
                    </Link>
                    <button className="delete-btn" onClick={() => handleDelete(player.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}


