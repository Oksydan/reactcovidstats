import React from 'react';
import { Link } from 'react-router-dom';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import StatsTableHead from './StatsTableHead/StatsTableHead';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const columns = [
  {
    id: "name",
    label: "Country",
    format: value => value !== 'All' ? <Link to={"/country/" + value}>{value}</Link> : value
  },
  {
    id: "totalCases",
    label: "Total cases",

    format: (value) => (value ? value.toLocaleString() : null),
  },
  {
    id: "newCases",
    label: "New cases",
    format: (value) => (value ? "+" + value : null),
  },
  {
    id: "newDeaths",
    label: "New deaths",
    format: (value) => (value ? "+" + value : null),
  },
  {
    id: "totalDeaths",
    label: "Total deaths",
    format: (value) => (value ? value.toLocaleString() : null),
  },
  {
    id: "activeCases",
    label: "Active cases",

    format: (value) => (value ? value.toLocaleString() : null),
  },
  {
    id: "criticalCases",
    label: "Critical cases",

    format: (value) => (value ? value.toLocaleString() : null),
  },
  {
    id: "recoveredCases",
    label: "Revoered cases",

    format: (value) => (value ? value.toLocaleString() : null),
  },
  {
    id: "totalTests",
    label: "Total tests",

    format: (value) => (value ? value.toLocaleString() : null),
  },
];

const StatsTable = ({ stats }) => {

    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState("totalCases");

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    return (
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <StatsTableHead
            onRequestSort={handleRequestSort}
            columns={columns}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {stableSort(stats, getComparator(order, orderBy)).map((el, i) => {
              return (
                <TableRow key={i}>
                  {columns.map((col) => {
                    return (
                      <TableCell key={col.id}>
                        {col.format ? col.format(el[col.id]) : el[col.id]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default StatsTable;