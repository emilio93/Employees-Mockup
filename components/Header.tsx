import React from 'react';

import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  addButton: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  },
  filterButton: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      border: "solid 1px white"
    },
  },
  resetButton: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      border: "solid 1px white"
    },
  },
  filterLabel: {
    display: 'block',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const handleNewEmployeeDialogOpen = () => {
    props.handleNewEmployeeDialogOpen(!props.newEmployeeDialogOpen);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" style={{ marginBottom: 10 }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Manage <strong>Employees</strong>
            </Typography>
            <Button color="inherit" startIcon={<AddCircleIcon />} className={classes.addButton} onClick={handleNewEmployeeDialogOpen}>
              Add new Employee
            </Button>
          </Toolbar>
          <Toolbar>
            <Typography variant="h6" className={classes.filterLabel}>
              Filter by Name:
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                value={props.search}
                onChange={props.handleSearchChange}
                placeholder="Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'name' }}
              />
            </div>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button color="inherit" className={classes.filterButton} onClick={props.filterEmployees}>
                Filter
              </Button>
              <Button color="inherit" className={classes.resetButton} onClick={props.resetFilter}>
                Reset
              </Button>
            </ButtonGroup>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
