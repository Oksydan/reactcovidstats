import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import StatsTableHead from './StatsTableHead/StatsTableHead';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  cell: {
    fontWeight: 700
  },
  dangerCell: {
    background: theme.palette.error.dark,
    color: '#fff'
  },
  warrningCell: {
    background: theme.palette.warning.light
  },
  successCell: {
    background: theme.palette.success.light
  },
  alignRight: {
    textAlign: 'right'
  }
}));


const StatsTable = React.memo(({ stats }) => {

  const history = useHistory();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("totalCases");
  const classes = useStyles();



  const handleLinkRedirect = (e, href) => {
    e.preventDefault();
    history.push(href);
  };

  const columns = [
    {
      id: "name",
      label: "Country",
      classes: [classes.cell],
      format: value => value !== 'All' ? <Link href="#" onClick={e => handleLinkRedirect(e, "/country/" + value ) }>{value}</Link> : value
    },
    {
      id: "totalCases",
      label: "Total cases",
      classes: [classes.cell, classes.alignRight],
      format: (value) => (value ? value.toLocaleString() : null),
    },
    {
      id: "newCases",
      label: "New cases",
      classes: [classes.cell, classes.alignRight, classes.warrningCell],
      format: (value) => (value ? "+" + value.toLocaleString() : null),
    },
    {
      id: "newDeaths",
      label: "New deaths",
      classes: [classes.cell, classes.alignRight, classes.dangerCell],
      format: (value) => (value ? "+" + value.toLocaleString() : null),
    },
    {
      id: "totalDeaths",
      label: "Total deaths",
      classes: [classes.cell, classes.alignRight],
      format: (value) => (value ? value.toLocaleString() : null),
    },
    {
      id: "activeCases",
      label: "Active cases",
      classes: [classes.cell, classes.alignRight],
      format: (value) => (value ? value.toLocaleString() : null),
    },
    {
      id: "criticalCases",
      label: "Critical cases",
      classes: [classes.cell, classes.alignRight],
      format: (value) => (value ? value.toLocaleString() : null),
    },
    {
      id: "recoveredCases",
      label: "Revoered cases",
      classes: [classes.cell, classes.alignRight, classes.successCell],
      format: (value) => (value ? value.toLocaleString() : null),
    },
    {
      id: "totalTests",
      label: "Total tests",
      classes: [classes.cell, classes.alignRight],
      format: (value) => (value ? value.toLocaleString() : null),
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const descendingComparator = useCallback((a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }, [])

  const getComparator = useCallback((order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }, []);

  const stableSort = useCallback((array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }, []);

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
                    <TableCell key={col.id} className={col.classes ? col.classes : null}>
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
});

export default StatsTable;