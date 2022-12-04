import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo,transactionId, paymentMethod, amount) {
  return { id, date, name, shipTo,transactionId, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Sumit Kumathalli', 'Shubham Pawar','5hFqcYTEzDe11OPt', 'VISA ⠀•••• 3719', 10000),
  createData(1, '16 Mar, 2019', 'Shweta Mulik', 'Arjun Gaikwad', '8RtvwY5cJnhPjSQO', 'VISA ⠀•••• 2574', 350000),
  createData(2, '16 Mar, 2019', 'Sunit Kale ', 'Pooja Ramraje','Q4HHXsIFS2VHxExO', 'MC ⠀•••• 1253', 50000),
  createData(3, '16 Mar, 2019', 'Sumit Dhotre Sir', 'Tushar Pinjan Sir','Q4HHXsIFS2VHxExO', 'AMEX ⠀•••• 2000', 700000),
  createData(4, '15 Mar, 2019', 'Pranav Mahamuni', 'Onkar Mahajan', 'Q4HHXsIFS2VHxExO', 'VISA ⠀•••• 5919', 30000),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Transfered To</TableCell>
            <TableCell>Transaction Id</TableCell>
            <TableCell>Transaction Id</TableCell>
            <TableCell align="right"> Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.transactionId}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}