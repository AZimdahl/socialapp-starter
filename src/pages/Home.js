import React from "react";
import Menu from "../components/menu/Menu";
import { userIsNotAuthenticated } from "../HOCs";
import SignupForm from "../components/signupForm/SignupForm";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import "./Home.css"

//ECS: since this is not utilizing state or lifecycle hooks, 
//it does not need to be a class component
class Home extends React.Component {
  render() {
    return (
      <>

        <Menu /> 
        
        <div className="description">
          <h1>Welcome to Kritter!</h1>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FavoriteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Follow your interests"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ChatIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="See what people are saying"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FormatQuoteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Share what's new on your timeline"/>
      </ListItem>
      </div>
      
      {/* ECS: 
      
        This type of commented out code/feature that
        wont be used or is part of an uninished feature
        should not make it to the master branch. 
      
      */}

        {/* <div className="description">
          <br />
          <ul>
            <li>Follow your interests</li>
            <li>See what people are saying</li>
            <li>Share what's new on your timeline</li>
            <br />
          </ul>
        </div> */}
        <SignupForm />
      </>
    );
  }
}

export default userIsNotAuthenticated(Home);
