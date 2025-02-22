
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css'
import SinglePlayerDetails from "./components/SinglePlayer";
import AllPlayers from './components/AllPlayers'
import { addPlayer } from './api';

function App() {

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [refresh, setRefresh] = useState(false);

  async function getData() {
    const playerData = await getPlayers();
    setPlayers(playerData);
  } 
  
  return (
    <>
      <h1>Puppy Bowl</h1>
      {/* build a form for client to submit below (anything visual) */}
      <Routes>
        <Route path="/"
          element={

            <AllPlayers refresh={refresh} name={name} setName ={setName} breed={breed} setBreed={setBreed} />} />


        <Route path="/player/:id" element={<SinglePlayerDetails />} />
      </Routes>
    </>
  );
}

export default App;
