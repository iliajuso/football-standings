import React, { useState, useEffect } from "react";
import "./App.css";
import LeagueSelector from "./components/LeagueSelector/LeagueSelector";
import TableContainer from "./components/TableContainer/TableContainer";
import axios from "axios";
function App() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [league, setLeague] = useState([]);
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(
           "https://cors-anywhere.herokuapp.com/http://api.football-data.org/v4/competitions/",
           {
             headers: {
               "X-Auth-Token": "7a71a06733f44a498b0a4f8c600b7a6e",
             },
             mode: "no-cors",
           }
         );
         console.log(response.data);
         setSelectedLeague(response.data)
         // Дальнейшая обработка данных, например, установка состояния
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

     fetchData();
   }, []);
  
  // useEffect(() => {
  //   // const apiUrl = `https://api-football-standings.azharimm.site/leagues`;
  //    try {
  //     fetch("http://api.football-data.org/v4/competitions/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setLeague(data);
  //         console.log(data);
  //       });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //  },[])
  // useEffect(() => {
  //   fetch("https://v3.football.api-sports.io/leagues/", {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "v3.football.api-sports.io",
  //       "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [])
// useEffect(() => {
//   fetch("https://v3.football.api-sports.io/leagues/", {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "v3.football.api-sports.io",
//       "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       // Дальнейшая обработка данных, например, установка состояния
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, []);

  // useEffect(() => {
  //   const apiUrl = "https://api-football-standings.azharimm.site/leagues";

  //   // Устанавливаем заголовки для обхода CORS
  //   const headers = {
  //     "Access-Control-Allow-Origin": "http://localhost:3000/", // Замените на ваш домен
  //     "Content-Type": "application/json",
  //   };

  //   // Выполняем GET запрос с использованием Axios
  //   axios
  //     .get(apiUrl, { headers })
  //     .then((response) => {
  //       // Обработка успешного ответа
  //       setLeague(response.league);
  //       console.log(response.league)
  //     })
  //     .catch((error) => {
  //       // Обработка ошибки
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios("https://media.api-sports.io/football/leagues").then((res) => {
  //     console.log(res.league);
  //   });
  // })
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
