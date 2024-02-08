const cache = {};

export const fetchFixtures = async (season, league, standings) => {
  const cacheKey = `${season}_${league}_${standings}`;

if (cache[cacheKey]) {
    console.log(`Using cached data for ${cacheKey}`);
    return cache[cacheKey];
  }

  const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${standings,league}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "0e60bd3403msheab4321fba3e368p19a36bjsne6de4d604bd8",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
console.log(result)
   
    cache[cacheKey] = result;

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchAllFixtures = async () => {
  const allData = [];

  const allSeasons = ["2023"];
  const allLeagues = ["39", "61", "78", "135", "140"];
  const allStandings = ["39", "61", "78", "135", "140"];

  try {
const promises = [];

    for (const season of allSeasons) {
      for (const league of allLeagues) {
        for (const standings of allStandings) {
          promises.push(fetchFixtures(season, league, standings));
        }
      }
    }

    
    const results = await Promise.all(promises);


    for (let i = 0; i < results.length; i++) {
      const season =
        allSeasons[Math.floor(i / (allLeagues.length * allStandings.length))];
      const leagueIndex = Math.floor(
        (i % (allLeagues.length * allStandings.length)) / allStandings.length
      );
      const league = allLeagues[leagueIndex];
      const standingsIndex = i % allStandings.length;
      const standings = allStandings[standingsIndex];

      allData.push({ season, league, standings, fixtures: results[i] });
    }
  } catch (error) {
    console.error("Error fetching fixtures:", error);
  }

  return allData;
};