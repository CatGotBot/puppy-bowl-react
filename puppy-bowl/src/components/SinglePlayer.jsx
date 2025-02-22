import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletePlayer } from "../api";
import { getPlayer } from "../api";

export default function SinglePlayer({ player }) {

    const { id } = useParams();
    const [currentPlayer, setCurrentPlayer] = useState(player);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPlayer() {
            if (!player) {
                try {
                    const player = await getPlayer(id); // Ensure getPlayers() is working correctly
                    console.log("Fetched players:", player);
                    if (player) {
                        setCurrentPlayer(player);
                    } else {
                        console.error("Player not found");
                    }
                } catch (error) {
                    console.error("Error", error);
                }
            }
        }
        fetchPlayer ();
    }, [id, player]);

    if (!currentPlayer) return <h2>Loading...</h2>;

    return (
        <>
            <div className="playerCard">
                <img src={currentPlayer.imageUrl} alt={`${currentPlayer.name} here's puppy!`} />
                <h1>Name: {currentPlayer.name}</h1>
                <h2>Breed: {currentPlayer.breed}</h2>
                <h2>Status: {currentPlayer.status}</h2>
            </div>
        </>
    );
}