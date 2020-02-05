/*

ECS: lots of repeated code in this file around the headers being attached for auth.
try an find a way to write this once and reuse it. 

PGM: I like how you clearly broke the methods into sections using comments.
The getMessagesList method takes in a username argument that it does not use, it should be removed.

*/


//import the axios HTTP client to communicate with the API
import axios from "axios";

class SocialAppService {
    constructor(url = "https://socialapp-api.herokuapp.com/", client = axios.create()) {
        this.url = url;
        this.endpoint = {
            users: "users/",
            messages: "messages/",
            likes: "likes/"
        }
        this.client = client;
        this.token = JSON.parse(localStorage.getItem("login"))
    }


    /*User functions*/
    createNewUser(credentials) {
        return this.client.post(this.url + this.endpoint.users, credentials)
    }

    deleteUser(username) {
        return this.client.delete(this.url + this.endpoint.users + username, {
            headers: {
                Authorization: "Bearer " + this.token.result.token
            }
        })
    }

    updateUser(username, data) {
        return this.client.patch(this.url + this.endpoint.users + username, data, {
            headers: {
                Authorization: "Bearer " + this.token.result.token
            }
        })
    }

    //PICTURE DATA SIZE IS RESTRICTED TO <= 200kb
    setUserPicture(username, picture) {
        return this.client.put(this.url + this.endpoint.users + username + "/picture", picture, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + this.token.result.token
            }
        })
    }

    getUserPicture(username){
        return this.client.get(this.url + this.endpoint.users + username + "/picture")
    }

    getUser(username) {
        return this.client.get(this.url + this.endpoint.users + username)
    }

    getUsersList(limit) {
        return this.client.get(this.url + this.endpoint.users)
    }


    /*Message functions */
    createMessage(content) {
        return this.client.post(this.url + this.endpoint.messages, content, {
            headers: {
                Authorization: "Bearer " + this.token.result.token
            }
        })
    }

    getMessagesList(limit, username) {
        return this.client.get(this.url + this.endpoint.messages + ("?limit=" + limit))
    }
    
    getMessage(messageId) {
        return this.client.get(this.url + this.endpoint.messages + messageId)
    }
    
    deleteMessage(messageId) {
        return this.client.delete(this.url + this.endpoint.messages + messageId)
    }


    /*Like functions*/
    addLike(messageId) {
        return this.client.post(this.url + this.endpoint.likes, { messageId: messageId }, {
            headers: {
                Authorization: "Bearer " + this.token.result.token
            }
        })
    }

    deleteLike(likeId) {
        return this.client.delete(this.url + this.endpoint.likes + likeId, {
            headers: {
                Authorization: "Bearer " + this.token.result.token
            }
        })
    }
}

export default SocialAppService;