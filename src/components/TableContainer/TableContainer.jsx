import React from "react";
import { useTable } from "react-table";
import s from "./TableContainer.module.css";
import championsLeagueLogo from "../images/UEFAChampionsLeagueQualifier.png";
import europeLeagueLogo from "../images/UEFAEuropaLeagueQualifier.png";
import conferenceLeagueLogo from "../images/EuropaConferenceLeagueQualifier.png";
import relegation from "../images/Relegation.png";
import play from "../images/play-off.png";
const TableContainer = ({ data, club }) => {
  const columns = [
    {
      Header: "",
      accessor: "rank",
      Cell: ({ row }) => <p> {row.original.rank}</p>,
    },

    {
      Header: "",
      accessor: "logo",
      Cell: ({ row }) => (
        <img
          src={row.original.team.logo}
          alt={row.original.team.name}
          className={s.teamLogo}
        />
      ),
    },

    {
      Header: "Club",
      accessor: "club",
      Cell: ({ row }) => <p> {row.original.team.name}</p>,
    },
    {
      Header: "", 
      accessor: "qualification",
      Cell: ({ row }) => (
        <div className={s.qualification}>
          {row.index < 4 && ( 
            <img
              src={championsLeagueLogo} 
              alt="Promotion Champions League"
              className={s.qualification}
            />
          )}
          {row.index >= 4 &&
            row.index < 5 && ( 
              <img
                src={europeLeagueLogo} 
                alt="Promotion Europa League"
                className={s.qualification}
              />
            )}
          {row.index >= 5 &&
            row.index < 6 && (
              <img
                src={conferenceLeagueLogo} 
                alt="Promotion Europa Conference League"
                className={s.qualification}
              />
            )}
          {data.length === 20 &&
            row.index >= 17 && ( 
              <img
                src={relegation} 
                alt="Relegation"
                className={s.qualification}
              />
            )}
          {data.length === 18 &&
            row.index >= 16 &&
            row.index !== 15 && ( 
              <img
                src={relegation} 
                alt="Relegation"
                className={s.qualification}
              />
            )}
          {data.length === 18 &&
            row.index === 15 && ( 
              <img
                src={play} 
                alt="Relegation play-off"
                className={s.qualification}
              />
            )}
        </div>
      ),
    },
    {
      Header: "MP",
      accessor: "games",
      Cell: ({ row }) => <p> {row.original.all.played}</p>,
    },
    {
      Header: "W",
      accessor: "wins",
      Cell: ({ row }) => <p> {row.original.all.win}</p>,
    },
    {
      Header: "D",
      accessor: "draws",
      Cell: ({ row }) => <p> {row.original.all.draw}</p>,
    },
    {
      Header: "L",
      accessor: "losses",
      Cell: ({ row }) => <p> {row.original.all.lose}</p>,
    },
    {
      Header: "GF",
      accessor: "goalsfor",
      Cell: ({ row }) => <p> {row.original.all.goals.for}</p>,
    },
    {
      Header: "GA",
      accessor: "goalsagainst",
      Cell: ({ row }) => <p> {row.original.all.goals.against}</p>,
    },
    {
      Header: "GD",
      accessor: "goalsdiff",
      Cell: ({ row }) => <p> {row.original.goalsDiff}</p>,
    },
    {
      Header: "Pts",
      accessor: "points",
      Cell: ({ row }) => <p> {row.original.points}</p>,
    },
  ];

  console.log(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  console.log(rows);
    return (
      <div className={s.table_container}>
        <table {...getTableProps()}>
          <thead className={s.thead}>
            <tr>
              {columns.map((item, index) => (
                <th
                  key={index}
                  className={`${s.Header} ${
                    index === 0 ? s.largeSpacing : s.smallSpacing
                  } ${index === 2 ? s.spacing : ""}`}
                >
                  {item.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={s.tbody}{...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr key={rowIndex} {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`${s.team} ${
                        cellIndex === row.cells.length - 1 ? s.greenText : ""
                      } ${
                        cellIndex === 2
                          ? s.teamCell
                          : "" /* Apply the style only to "Club" cells */
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

export default TableContainer;
