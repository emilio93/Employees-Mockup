import React from 'react';

import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ErrorIcon from '@material-ui/icons/Error';

import EmployeeRow from './EmployeeRow';
import { Grid, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  editButton: {
    color: theme.palette.warning.main,
  },
  removeButton: {
    color: theme.palette.error.main,
  },
}));

function createData(firstName: String, lastName: String, email: String) {
  return { firstName, lastName, email };
}

const rows = [
  createData('Frozen yoghurt', "sdgohsgo", "fasgag@gmail.com"),
  createData('Ice cream sandwich', "sdgohsgo", "asdgsadgas@gmail.com"),
  createData('Eclair', "sdgohsgo", "agdasg@gmail.com"),
  createData('Cupcake', "sdgohsgo", "luasduuau@gmail.com"),
  createData('Gingerbread', "sdgohsgo", "asgagasdg@gmail.com"),
];

export default function EmployeesTable(props: any) {
  const classes = useStyles();
  const {
    employees,
    updateEmployee,
    removeEmployee,
    openUpdateForm,
    handleNewEmployeeDialogOpen,
    handleNewEmployeeDialogClose
  } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        {employees.length > 0 ?
          (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee, id: number) => (
                    <EmployeeRow
                      key={id}
                      id={id}
                      employee={employee}
                      openUpdateForm={openUpdateForm}
                      removeEmployee={removeEmployee}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (

            <Grid container direction="column" alignItems="center">
              <Grid item>
                <ErrorIcon />
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  No employees available.
                </Typography>
              </Grid>
            </Grid>
          )}

      </Container>
    </React.Fragment>
  );
}
