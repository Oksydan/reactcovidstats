import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import StatsTableHead from './StatsTableHead/StatsTableHead';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  cell: {
    fontWeight: 500,
    padding: '8px 12px',
    backgroundColor: 'transparent'
  },
  smallWidth: {
    width: '100px'
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
  },
  reversedDirection: {
    flexDirection: 'row-reverse'
  },
  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    overflow: 'hidden'
  },
  tableContainer: {
    marginBottom: '-1px'
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
      activeClass: classes.warrningCell,
      classes: [classes.cell, classes.alignRight, classes.smallWidth],
      format: (value) => (value ? "+" + value.toLocaleString() : null),
    },
    {
      id: "newDeaths",
      label: "New deaths",
      activeClass: classes.dangerCell,
      classes: [classes.cell, classes.alignRight, classes.smallWidth],
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
      activeClass: classes.successCell,
      classes: [classes.cell, classes.alignRight],
      format: (value) => (value ? value.toLocaleString() : null),
    },
    {
      id: "testPerCase",
      label: "Test per case",
      classes: [classes.cell, classes.alignRight],
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
  }, [descendingComparator]);

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
    <Paper className={classes.paper}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <StatsTableHead
            onRequestSort={handleRequestSort}
            columns={columns}
            order={order}
            orderBy={orderBy}
            styleClasses={[classes.cell, classes.reversedDirection, classes.alignRight]}
          />
          <TableBody>
            {stableSort(stats, getComparator(order, orderBy)).map((el, i) => {
              return (
                <TableRow className={classes.tableRow} key={i}>
                  {columns.map((col) => {
                    const className = [...col.classes, (col.activeClass && el[col.id] ? col.activeClass : null)];

                    return (
                      <TableCell key={col.id} className={className.join(' ')}>
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
    </Paper>
    
  );
});

export default StatsTable;