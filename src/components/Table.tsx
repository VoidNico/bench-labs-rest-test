import React, { useMemo } from 'react';
import {
  Theme, makeStyles, Paper, Typography,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import dateformat from 'dateformat';

interface IRow {
  Date: string;
  Ledger: string;
  Amount: string;
  Company: string;
}
interface IProps {
  data: IRow[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: { height: '100%' },
  table: {
    '& th': {
      color: theme.palette.primary.main,
      backgroundColor: '#FFF',
      fontSize: '1rem',
      fontWeight: 700,
    },
    '& td': {
      color: theme.palette.secondary.main,
      fontSize: '.8rem',
      fontWeight: 500,
      transition: 'color .25s ease-in-out, background-color .25s ease-in-out',
      '&:hover': { color: theme.palette.primary.main },
    },
  },
  row: {
    '&:hover td': {
      color: theme.palette.primary.main,
      backgroundColor: '#F9F8F6',
    },
  },
  company: {
    'td&': {
      color: '#222',
      fontSize: '.75rem',
      fontWeight: 700,
    },
  },
  value: {
    'td&': {
      color: '#222',
      fontSize: '.95rem',
      fontWeight: 700,
    },
  },
}));

export const TableContent = (props: IProps) => {
  const classes = useStyles();

  const total = useMemo(() => (props.data || []).map(row => Number(row.Amount)).reduce((a, b) => a + b, 0), [props.data]);

  return (
    <TableContainer component={Paper} classes={{ root: classes.root }}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Account</TableCell>
            <TableCell align="right">${total}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.data || []).length <= 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body1" color="primary">No Data</Typography>
              </TableCell>
            </TableRow>
          )}
          {(props.data || []).map((row, i) => (
            <TableRow key={`table-row-${i}`} className={classes.row}>
              <TableCell>{dateformat(new Date(row.Date), 'mmm dS, yyyy')}</TableCell>
              <TableCell classes={{ body: classes.company }}>{row.Company}</TableCell>
              <TableCell>{row.Ledger}</TableCell>
              <TableCell classes={{ root: classes.value }} align="right">${Number(row.Amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
