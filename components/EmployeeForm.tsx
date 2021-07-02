import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { Employee } from '../types/types';

export default function FormDialog(props) {

  const {newEmployeeDialogOpen, handleNewEmployeeDialogClose} = props;


  const addEmployee = () => {
    props.cleanFields();
    props.addEmployee(getEmployee());
    handleNewEmployeeDialogClose();
  };

  const updateEmployee = () => {
    props.updateEmployee(getEmployee());
    props.cleanFields();
    handleNewEmployeeDialogClose();
  };

  const {id, firstName, lastName, email} = props;

  const getEmployee = () => {
   return {firstName, lastName, email};
 };

  return (
    <div>
      <Dialog open={newEmployeeDialogOpen} onClose={handleNewEmployeeDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.isUpdate ? 'Update' : 'Create'} Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            value={firstName}
            onChange={props.handleFirstNameChange}
            label="First Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="lastName"
            value={lastName}
            onChange={props.handleLastNameChange}
            label="Last Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            value={email}
            onChange={props.handleEmailChange}
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.isUpdate ? updateEmployee : addEmployee} color="primary">
          {props.isUpdate ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
