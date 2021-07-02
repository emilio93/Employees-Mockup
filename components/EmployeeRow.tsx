import React , {useEffect} from 'react';

import { makeStyles, fade } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Employee } from '../types/types';


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

export default function EmployeeRow(props: any) {

  const classes = useStyles();
  const { idx, employee } = props;

  const openUpdateForm = () => {
    props.openUpdateForm(idx, employee);
  };

  const removeEmployee = () => {
    props.removeEmployee(idx);
  };


  return (
    <TableRow>
      <TableCell component="th" scope="row">{employee.firstName} {employee.lastName}</TableCell>
      <TableCell >{employee.email}</TableCell>
      <TableCell align="center">
        <Tooltip title="Edit" placement="left">
          <Button className={classes.editButton} onClick={openUpdateForm}>
            <EditIcon />
          </Button>
        </Tooltip>
        &nbsp;
        <Tooltip title="Delete" placement="right">
          <Button className={classes.removeButton} onClick={removeEmployee}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
