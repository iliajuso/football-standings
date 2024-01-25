// import React from "react";
// import s from "./TableMain.css";
// const TableMain = ({ rows, prepareRow, club }) => (
//   <tbody>
//     {rows.map((row, rowIndex, club) => {
//       prepareRow(row);
//       return (
//         <tr key={rowIndex} {...row.getRowProps()}>
//           {row.cells.map((cell, cellIndex) => (
//             <td
//               key={cellIndex}
//               className={`${s.team} ${
//                 cellIndex === row.cells.length - 1 ? s.greenText : ""
//               }`}
//               {...cell.getCellProps()}
//             >
//               {cell.render("Cell")}
//             </td>
//           ))}
//         </tr>
//       );
//     })}
  
//   </tbody>
// );

// export default TableMain;
