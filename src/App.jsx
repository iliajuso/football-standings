import React, { useState, useEffect } from "react";
import "./App.css";
import LeagueSelector from "./components/LeagueSelector/LeagueSelector";
import TableContainer from "./components/TableContainer/TableContainer";
import axios from "axios";
import { fetchAllFixtures, fetchFixtures } from "./lib/fetch-data";
function App() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [league, setLeague] = useState([]);
  const [loading, setLoading]= useState (false)

  const fetchData = async () => {
    const fixtures = await fetchAllFixtures();
    console.log(fixtures)
  }
  useEffect(() => {
    fetchData();
  },[])
  
  const leagues = [
    { id: "1", name: "Premier League" },
    { id: "2", name: "La Liga" },
    { id: "3", name: "Serie A" },
    // Другие лиги
  ];
  const data = [
    { team: "Team 1", games: 10, wins: 7, draws: 2, losses: 1, points: 23 },
    // Другие данные
  ];
  const handleLeagueChange = (selectedValue) => {
    setSelectedLeague(selectedValue);
    // Здесь вы можете выполнить другие действия при изменении выбранной лиги, например, загрузить данные для выбранной лиги.
  };
  return (
    <div className="container">
      <LeagueSelector
        leagues={leagues}
        selectedLeague={selectedLeague}
        onChange={handleLeagueChange}
      />
      <TableContainer data={data} />
    </div>
  );
}

export default App;
