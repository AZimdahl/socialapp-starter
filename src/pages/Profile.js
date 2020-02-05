import React from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../HOCs";
import UserInfo from "../components/userInfo/UserInfo";
import CreateMessage from "../components/createMessage/CreateMessage";
import MessageFeed from "../components/messageFeed/MessageFeed";
import SuggestedUsers from "../components/suggestedUsers/SuggestedUsers"
import SocialAppService from "../socialAppService";
import "./Profile.css"


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.client = new SocialAppService();
    this.state = {
      messageData: []
    };
  }
  /*

  PGM: Be careful hard coding the limit into the below method. Once the message list gets larger than 25 messages, 
  you will not be getting a full message list.

  */
  
  getMessageList = () => {
      return this.client.getMessagesList(25).then(result => {
        this.setState({
          messageData: result.data.messages
        });
      });
    }

    componentDidMount() {
      this.getMessageList();
    }



  render() {
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>
        <br/>
        
        <UserInfo username={this.props.match.params.username}/>
        <br />
        <CreateMessage getMessageHandler={this.getMessageList}/>
        <MessageFeed getMessageHandler={this.getMessageList} messages={this.state.messageData} />

        <SuggestedUsers/>
      </>
    );
  }
}

export default userIsAuthenticated(Profile);
