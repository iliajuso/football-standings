// import React from 'react'
// import { useTable } from "react-table";
// import s from './TableContainer.module.css'
// export const TableContainer = ({ data }) => {
//       const columns = [
//         { Header: "Club", accessor: "team" },
//         { Header: "MP", accessor: "games" },
//         { Header: "W", accessor: "wins" },
//         { Header: "D", accessor: "draws" },
//         { Header: "L", accessor: "losses" },
//         { Header: "GF", accessor: "goalsfor" },
//         { Header: "GA", accessor: "goalsagainst" },
//         { Header: "GD", accessor: "goalsdiff" },
//         { Header: "Pts", accessor: "points" },
//     ];
//      const {
//        getTableProps,
//        getTableBodyProps,
//        headerGroups,
//        rows,
//        prepareRow,
//      } = useTable({ columns, data });
//   return (
//     <div className={s.table_container}>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column, index) => (
//                 <th
//                   key={index}
//                   className={`${s.header} ${
//                     index === 0 ? s.largeSpacing : s.smallSpacing
//                   }`}
//                   {...column.getHeaderProps()}
//                 >
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell, cellIndex) => (
//                   <td
//                     key={cellIndex}
//                     className={`${s.team} ${
//                       cellIndex === row.cells.length - 1 ? s.greenText : ""
//                     }`}
//                     {...cell.getCellProps()}
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// TableContainer.jsx
import React from 'react';
import { useTable } from "react-table";
import s from './TableContainer.module.css';
import TableHeader from '../TableHeader/Tableheader';
import TableMain from '../TableMain/TableMain';

const TableContainer = ({ data }) => {
  const columns = [
    { Header: "Club", accessor: "team" },
    { Header: "MP", accessor: "games" },
    { Header: "W", accessor: "wins" },
    { Header: "D", accessor: "draws" },
    { Header: "L", accessor: "losses" },
    { Header: "GF", accessor: "goalsfor" },
    { Header: "GA", accessor: "goalsagainst" },
    { Header: "GD", accessor: "goalsdiff" },
    { Header: "Pts", accessor: "points" },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className={s.table_container}>
      <table {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} />
        <TableMain rows={rows} prepareRow={prepareRow}  />
      </table>
    </div>
  );
}

export default TableContainer;
