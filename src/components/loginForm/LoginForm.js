import React from "react";
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../HOCs";
import "./LoginForm.css";

import InputBase from '@material-ui/core/InputBase'
import { fade, withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import Button from "@material-ui/core/Button";


const styles = theme => ({
  
  login: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  userIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class LoginForm extends React.Component {
  state = { username: "", password: "" }
  

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <form id="login-form" onSubmit={this.handleLogin}>
          {/* <label htmlFor="username">Username: </label> */}
          <div className={classes.login}>
          <div className={classes.userIcon}>
            <AccountCircleIcon />
            </div>
            
            <InputBase
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>

            <div className={classes.login}>
            <div className={classes.passIcon}>
            <BubbleChartIcon />
            </div>
            
            <InputBase
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              type= 'password'
            />
            </div>
          
          &nbsp;&nbsp;&nbsp;
          <Button
            size="small"
            className="postButton"
            type="submit"
            variant="contained"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>

        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withAsyncAction("auth", "login")(LoginForm));
