import React from 'react';
import { Link } from "react-router-dom";
import "./Menu.css";
import { withAsyncAction } from "../../HOCs";
import LoginForm from '../loginForm/LoginForm';
import logo from "../images/Kritter.png"

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  title: {
    flexGrow: 1,
  },
}));


function Menu(props) {
  const classes = useStyles();

  const handleLogout = event => {
    event.preventDefault();
    props.logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              <img src={logo} id="title" alt="logo"></img>
            </Link>
          </Typography>
          {props.isAuthenticated && (

            <div id="menu-links">
              {/* <Link to="/messagefeed"> <Button className={classes.menuButton}>Message Feed</Button> </Link> */}
              <Link to="/" onClick={handleLogout}>
                <Button className={classes.menuButton}>Logout</Button>
              </Link>
            </div>
          )}
          {!props.isAuthenticated && (
            <LoginForm />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}


/*

  PGM: I think i wrote the below export. It should be simplified to:
  export default withAsyncAction("auth", "logout")(Menu)

  */

const connectedMenu = withAsyncAction("auth", "logout")(Menu)

export default connectedMenu
