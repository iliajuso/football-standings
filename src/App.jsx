import React, { useState, useEffect } from "react";
import "./App.css";
import LeagueSelector from "./components/LeagueSelector/LeagueSelector";
import TableContainer from "./components/TableContainer/TableContainer";
import { fetchAllFixtures } from "./lib/fetch-data";

function App() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [loading, setLoading] = useState(false);
  const [leagueData, setLeagueData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     try {
  //       const fixtures = await fetchAllFixtures();

  //       // Filter fixtures based on the selected league
  //       const selectedLeagueFixtures = fixtures.filter(
  //         (fixture) => fixture.league === selectedLeague
  //       );

  //       const updatedLeagueData = selectedLeagueFixtures.map((fixture) => ({
  //         season: fixture.season,
  //         league: fixture.league,
  //         data: fixture.fixtures,
  //       }));
  //       const allStandings = updatedLeagueData.flatMap(
  //         (data) => data?.data?.response[0]?.league?.standings[0] || []
  //       );

  //       setLeagueData(allStandings);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [selectedLeague]);
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);

    try {
      const fixtures = await fetchAllFixtures();

      // Filter fixtures based on the selected league
      const selectedLeagueFixtures = fixtures.filter(
        (fixture) => fixture.league === selectedLeague
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
console.log(`Selected League (${selectedLeague}):`, selectedLeagueFixtures);
      const updatedLeagueData = selectedLeagueFixtures.map((fixture) => ({
        season: fixture.season,
        league: fixture.league,
        data: fixture.fixtures,
      }));

      const uniqueTeams = new Set();
      const allStandings = updatedLeagueData
        .flatMap((data) => data?.data?.response[0]?.league?.standings[0] || [])
        .filter((team) => {
          if (!uniqueTeams.has(team.team.name)) {
            uniqueTeams.add(team.team.name);
            return true;
          }
          return false;
        });

      setLeagueData(allStandings);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [selectedLeague]);
  const leagues = [
    { id: "39", name: "Premier League" },
    { id: "61", name: "Ligue 1" },
    { id: "78", name: "Bundesliga" },
    { id: "135", name: "Serie A" },
    { id: "140", name: "La Liga" },
    // Add other leagues as needed
  ];

  const handleLeagueChange = (selectedLeague) => {
    setSelectedLeague(selectedLeague);
  };
 const MemoizedTableContainer = React.memo(TableContainer);
  return (
    <div className="container">
      <LeagueSelector
        leagues={leagues}
        selectedLeague={selectedLeague}
        onChange={handleLeagueChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MemoizedTableContainer data={leagueData} club={`Club for ${selectedLeague}`} />
      )}
    </div>
  );
}

export default App;
