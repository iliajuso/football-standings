import React from "react";
import s from "./TableHeader.module.css";

const TableHeader = ({ headerGroups }) => (
  <thead>
    {headerGroups.map((headerGroup, index) => (
      <tr key={index} {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column, columnIndex) => (
          <th
            key={columnIndex}
            className={`${s.header} ${
              columnIndex === 0 ? s.largeSpacing : s.smallSpacing
            }`}
            {...column.getHeaderProps()}
          >
            {column.render("Header")}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default TableHeader;
