import React, { useState, useEffect } from "react";
import "./App.css";
import LeagueSelector from "./components/LeagueSelector/LeagueSelector";
import TableContainer from "./components/TableContainer/TableContainer";
import { fetchAllFixtures } from "./lib/fetch-data";

function App() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [loading, setLoading] = useState(false);
  const [leagueData, setLeagueData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
    const [leagueName, setLeagueName] = useState("");
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
    {
      id: "39",
      name: "Premier League",
      image: "https://media.api-sports.io/football/leagues/39.png",
    },
    {
      id: "61",
      name: "Ligue 1",
      image: "https://media.api-sports.io/football/leagues/61.png",
    },
    {
      id: "78",
      name: "Bundesliga",
      image: "https://media.api-sports.io/football/leagues/78.png",
    },

    {
      id: "135",
      name: "Serie A",
      image: "https://media.api-sports.io/football/leagues/135.png",
    },
    {
      id: "140",
      name: "La Liga",
      image: "https://media.api-sports.io/football/leagues/140.png",
    },
  ];

  const handleLeagueChange = (selectedLeague) => {
    setSelectedLeague(selectedLeague);
    const selectedLeagueObject = leagues.find(
      (league) => league.id === selectedLeague
    );
     setLeagueName(selectedLeagueObject.name);
    setSelectedImage(selectedLeagueObject.image);
  };
  console.log(leagueData)
 const MemoizedTableContainer = React.memo(TableContainer);
  return (
    <div className="container">
      <div className="selector">
        {selectedImage && (
          <div className="logoText">
            <img
              className="leagueLogo"
              src={selectedImage}
              alt="Selected League"
            />
            <div>
              {" "}
              <p className="leagueText">{leagueName}</p>
              <p className="seasonText">Season 2023 - 2024</p>
            </div>
          </div>
        )}
        <LeagueSelector
          leagues={leagues}
          selectedLeague={selectedLeague}
          onChange={handleLeagueChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MemoizedTableContainer
          data={leagueData}
          club={`Club for ${selectedLeague}`}
        />
      )}
    </div>
  );
}

export default App;
