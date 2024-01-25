import React, { useState, useEffect } from "react";
import "./App.css";
import LeagueSelector from "./components/LeagueSelector/LeagueSelector";
import TableContainer from "./components/TableContainer/TableContainer";
import { fetchAllFixtures, fetchFixtures } from "./lib/fetch-data";
function App() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [leagueData, setLeagueData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fixtures = await fetchAllFixtures();
        console.log(fixtures);

        const updatedLeagueData = fixtures.map((fixture) => ({
          season: fixture.season,
          league: fixture.league,
          data: fixture.fixtures,
        }));

        setLeagueData(updatedLeagueData[0].data.response[0].league.standings[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchData(); // Call fetchData when the component mounts
  }, []);
console.log(leagueData)

  const leagues = [
    { id: "1", name: "Premier League" },
    { id: "2", name: "La Liga" },
    { id: "3", name: "Serie A" },
    // Другие лиги
  ];
  const MemoizedTableContainer = React.memo(TableContainer);
  return (
    <div className="container">
      <LeagueSelector
        leagues={leagues}
        // selectedLeague={selectedLeague}
        // onChange={handleLeagueChange}
      />
      {loading ? <p>Loading...</p> : leagueData && <MemoizedTableContainer data={leagueData} />}
    </div>
  );
}

export default App;
