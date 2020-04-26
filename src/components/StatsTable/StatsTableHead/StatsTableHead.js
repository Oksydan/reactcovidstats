import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";


const StatsTableHead = props => {
    const { columns, onRequestSort, order, orderBy } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              sortDirection={orderBy === col.id ? order : false}
              key={col.id}
            >
              <TableSortLabel
                active={orderBy === col.id}
                direction={orderBy === col.id ? order : "asc"}
                onClick={createSortHandler(col.id)}
              >
                {col.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

export default StatsTableHead;