// bring these from 23A Sim

const BASE_URL = "https://fsa-puppy-bowl.herokuapp.com/api/kseniia"

export async function getPlayers() {
    try {
        const response = await fetch(`${BASE_URL}/players`)
        const json = await response.json();
        return json.data.players;
    } catch (error) {
        console.error("Error fetching:", error);
        return [];
    }
}
export async function getPlayer(id) {
    try {
        const response = await fetch(`${BASE_URL}/players/${id}`)
        const json = await response.json();
        return json.data.player;
    } catch (error) {
        console.error("Error fetching:", error);
        return [];
    }
}

export async function addPlayer(player) {
    try {
        const response = await fetch(`${BASE_URL}/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(player),
        });

        if (!response.ok) throw new Error("Failed to add");
        const json = await response.json();
        console.log (json)
        return json.data.newPlayer;
    }
    catch (error) {
        console.error("Error adding", error);
    }
}

export async function deletePlayer(playerId) {
    try {
        const response = await fetch(`${BASE_URL}/players/${playerId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete");
    }
    catch (error) {
        console.error("Error deleting", error);
    }}

getPlayers();