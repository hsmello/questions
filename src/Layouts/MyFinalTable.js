import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: 500,
  },
});

function createData(name, score, comment) {
  return { name, score, comment };
}

const rowws = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function MyFinalTable(props) {
  const classes = useStyles(); 

  const rows = [
    createData(props.player, props.score, props.comment)
  ]


  return (
    <TableContainer component={Paper} align="center" >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="center">Pontuação</TableCell>
            <TableCell align="center">Comentário</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>

          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.score}</TableCell>
              <TableCell align="left">{row.comment}</TableCell>

            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}