import React from "react";
import { useTable } from "react-table";
import s from "./TableContainer.module.css";

const TableContainer = ({ data, club}) => {
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
console.log(rows)
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
