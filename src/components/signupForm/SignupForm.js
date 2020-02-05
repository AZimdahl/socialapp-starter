import React, { Component } from "react"
import "./SignupForm.css"
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { withAsyncAction } from "../../HOCs";

//import our service
import SocialAppService from "../../socialAppService";

const styles = theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 350,
      },
    },
  });

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.client = new SocialAppService();
        this.state = {
            formData: {
                username: "",
                displayName: "",
                password: ""
            }
        }
    }

    handleChange = (event) => {
        let formData = this.state.formData;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.client.createNewUser(this.state.formData).then(() =>
            this.props.login({
                username: this.state.formData.username,
                password: this.state.formData.password
            })
        )
    }

    render() {
        const { classes } = this.props;

        /*ECS:

        The onChange attached to the <form> tag should be on each individual <TextField> leaving only
        the onSubmit on the <form> tag itself

        */
        return (

            <form className={classes.root + " signup"} noValidate autoComplete="off" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <div className="h1Element">
                    <h1>Sign up</h1>
                    </div>
                    {/* ECS:
                    
                        Each textfield controlled by state (controlled components) should have it's
                        value bound to the associated value in state

                        Example
                        value={this.state.data.formData.username}

                        See comment above about moving the onchange from the <form> tag to the fields
                        themselves.

                        PGM: Also, there is an error in the console coming from the first Textfield component.
                        It is expecting a boolean for the fullWidth property instead of a string.

                        There's also a warning in the console because you have set the id's for all the Textfield
                        components to "standard-required" whereas element id's should be unique.
                    
                    */}
                <TextField
                    required
                    id="standard-required"
                    name="username"
                    label="Username"
                    fullWidth="true"
                />
                <TextField
                    required
                    id="standard-required"
                    name="displayName"
                    label="Display Name"
                />
                <TextField
                    required
                    id="standard-required"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <br/>
                <div className="submitButton">
                <button className="submitButton" type="submit">
                    Sign Up
                </button>
                </div> 
            </form>
        )
    }
}

export default withStyles(styles)(withAsyncAction("auth", "login")(SignupForm))