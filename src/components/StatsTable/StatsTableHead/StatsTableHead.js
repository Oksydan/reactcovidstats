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
    const [cellStyle, reversedDirection, alignRiht] = props.styleClasses;
    return (
      <TableHead>
        <TableRow>
          {columns.map((col, i) => (
            <TableCell
              sortDirection={orderBy === col.id ? order : false}
              key={col.id}
              className={[cellStyle, ...(i !== 0 ? [reversedDirection, alignRiht] : [])].join(' ')}
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