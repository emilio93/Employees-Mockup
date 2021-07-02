import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function FormDialog(props) {

  const { firstName, lastName, email } = props;
  const { newEmployeeDialogOpen, handleNewEmployeeDialogClose } = props;
  const { handleFirstNameChange, handleLastNameChange, handleEmailChange } = props;

  const [hasAlert, setHasAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const getEmployee = () => {
    return { firstName, lastName, email };
  };

  const addEmployee = () => {
    props.addEmployee(getEmployee());
    props.cleanFields();
    handleNewEmployeeDialogClose();
  };

  const updateEmployee = () => {
    props.updateEmployee(getEmployee());
    props.cleanFields();
    handleNewEmployeeDialogClose();
  };

  // from https://emailregex.com/
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

  const showAlert = (alertMessage) => {
    console.log('showing');
    setAlertMessage(alertMessage);
    setHasAlert(true);
  };

  const handleClick = () => {
    if (firstName.trim().length === 0)
      return showAlert("First name cannot be empty.");
    if (lastName.trim().length === 0)
      return showAlert("Last name cannot be empty.");
    if (`${firstName} ${lastName}`.length > 50)
      return showAlert("Full name has to be 50 characters or less.");
    if (email.trim().length === 0)
      return showAlert("Email cannot be empty.");
    if (!email.match(emailRegex))
      return showAlert("Email is invalid.");

    if (props.isUpdate) updateEmployee();
    else addEmployee();
  };

  const formTitle = `${props.isUpdate ? 'Update' : 'Create'} Employee`;
  const buttonText = props.isUpdate ? 'Update' : 'Submit';

  const handleAlertClose = () => {
    setHasAlert(false);
  };

  return (
    <div>
      <Snackbar open={hasAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={newEmployeeDialogOpen}
        onClose={handleNewEmployeeDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            label="First Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            label="Last Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            value={email}
            onChange={handleEmailChange}
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">{buttonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
