// export const fetchFixtures = async (season, league) => {
//   const season = "all";
//   const league = "all";

//   const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;

//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//       "x-rapidapi-key": "0e60bd3403msheab4321fba3e368p19a36bjsne6de4d604bd8",
//     },
//   };

//   try {
//     const response = await fetch(url, options);

//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null; // You may choose to handle errors differently based on your application logic
//   }
// };
export const fetchFixtures = async (season, league) => {
  const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;

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
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchAllFixtures = async () => {
  const allData = [];

  // Replace these arrays with the actual list of seasons and leagues you want to fetch
  const allSeasons = ["2020", "2021", "2024"];
  const allLeagues = ["39", "35", "41", "36", "37", "38"];

  for (const season of allSeasons) {
    for (const league of allLeagues) {
      const fixtures = await fetchFixtures(season, league);
      allData.push({ season, league, fixtures });
    }
  }

  return allData;
};
