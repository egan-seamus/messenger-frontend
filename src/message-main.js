import { render } from '@testing-library/react';
import React from 'react';
import { useEffect, useRef } from 'react'
import './messageMain.css'
import axios from 'axios';
import openSocket from 'socket.io-client';

// for style see 
// css-tricks on grid layouts

const baseURL = "http://localhost:8000/"
const previewsURL = baseURL.concat("messaging/previews/")
const idURL = baseURL.concat("messaging/id/")
const conversationURL = baseURL.concat("messaging/conversation/")
const searchURL = baseURL.concat("messaging/search/")

// one single result from a search
// props needed: username, id, onClick(e, id)
function SearchBarResult(props) {

    return (
        <div className="searchResult" onClick={(e) => props.onClick(e, props.id)}>
            {props.username}
        </div>
    )
}

// props needed 
// searchResults {username, id}, onChildClick(e, id), 
// onSearchFormChange(e), onSearchButtonClick(e)
function SearchBar(props) {
    return (
        <div className="searchBar">
            <form id="searchInputform" action="">
                <input id="searchInputformInput" autocomplete="off" placeholder="search" onChange={(e) => props.onSearchFormChange(e)} />
                <button id="searchInputformButton" onClick={(e) => props.onSearchButtonClick(e)}>Search</button>
            </form>
            {props.searchResults.map((result) =>
                <SearchBarResult onClick={props.onChildClick} id={result.id} username={result.username}></SearchBarResult>
            )}
        </div>
    )
}

// one entry in the message side bar
// should display a username and the most 
// recent message
// todo change to stateless function
function MessageEntry(props) {


    return (
        <div className="MessageEntry" onClick={(e) => props.handleClick(e, props.id)}>
            <h1 className="MessageEntrySender">{props.username}</h1>
            <p1 className="MessageEntryBody">{props.message}</p1>
        </div>
    );

}

// the side bar for the messanger main page
function SideBar(props) {
    console.log("i have updated")
    return (
        <div className="MessageSideBar">
            <ul className="mList">
                {props.messages.map((entry) =>
                    <li>
                        <MessageEntry username={entry.username} id={entry.id} message={entry.message}
                            handleClick={props.entryCallback} />
                    </li>
                )}
            </ul>
        </div>
    );

}

// represents one message in the current conversation
/**
     * @param {*} props contains { message : string, id : int}
     * }
     * where message is the message text and id the id of the sender
     */
function ConversationMessage(props) {

    if (props.id === props.myID) {
        return (
            <div className="ConversationMessageSent">
                {props.message}
            </div>
        );
    }
    else {
        return (
            <div className="ConversationMessageReceived">
                {props.message}
            </div>
        );
    }

}



function ConversationView(props) {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom)

    console.log(props)
    return (
        <div className="ConversationView">
            <ul className="ConversationList">
                {props.messages.map((entry) =>
                    <li>
                        <ConversationMessage id={entry.id} message={entry.message} myID={props.myID} />
                    </li>
                )}
                <div id="conversationAnchor" ref={messagesEndRef} />
            </ul>
        </div>
    );
}


const s = { message: "send send", id: 0 };

const r = { message: "receive receive", id: 2 };

class MessageTypingBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messageText: ""
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        this.props.onMessageSend(this.state.messageText);
    }

    handleMessageChange = (e) => {
        e.preventDefault()
        this.setState({ messageText: e.target.value })
    }

    render() {
        return (
            <div className="MessageTypingBar">
                <form id="messageInputForm" action="">
                    <input id="messageInputFormInput" autocomplete="off" onChange={(e) => this.handleMessageChange(e)} />
                    <button id="messageInputFormButton" onClick={(e) => this.handleClick(e)}>Send</button>
                </form>
            </div>
        )
    }
}

// the messanger main page
class MessageMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [], // messages in the preview bar
            conversationMessages: [], // messages in the current conversation
            currentUserID: -1, //id of the current user
            selectedUserID: 1,// id of the other user who's conversation is in foucs
            socket: null, // web socket 
            searchResults: [] // results from a search query
        }

    }

    // functions to call after we begin to exist
    componentDidMount() {
        // get the correct user id
        axios.post(idURL, {
            username: this.state.username,
            password: this.state.password
        }, { withCredentials: true })
            .then((response) => {
                this.setState({
                    currentUserID: response.data.id
                })
                console.log("User ID: ", this.state.currentUserID)

                // get the message previews
                axios.post(previewsURL, {
                    username: this.state.username,
                    password: this.state.password
                }, { withCredentials: true })
                    .then((response) => {
                        let previews = []
                        for (let i = 0; i < response.data.length; i++) {
                            let entry =
                            {
                                username: response.data[i].username,
                                id: response.data[i].sender_id === this.state.currentUserID ? response.data[i].recipient_id : response.data[i].sender_id,
                                message: response.data[i].message
                            }
                            previews.push(entry)
                        }

                        // {username: string, id: int, message : string}
                        // where id is the id of the not-this-person in the 
                        // message
                        this.setState({
                            messages: previews
                        })
                        console.log(this.state.messages)

                        console.log(response)
                    }).catch((response) => {
                        // if we don't get the messages
                        console.log(response)
                    })

                // open a socket
                const newSocket = openSocket('http://localhost:3001', {
                    withCredentials: false,
                    extraHeaders: {
                        "user_id": this.state.currentUserID
                    }
                });
                this.setState({
                    socket: newSocket
                })
                console.log("socket opened")
                console.log(this.state.socket)

                this.state.socket.on('message-to-client', (message) => {
                    console.log(message)
                    this.receiveMessage(message)
                })


            }).catch((response) => {

            })


    }

    // receive a message from the socket
    receiveMessage = (message) => {
        if (message.sender_id == this.state.selectedUserID) {
            let m = this.state.conversationMessages;
            let newM = { message: message.text, id: message.sender_id }
            m.push(newM)
            this.setState({ conversationMessages: m })
        }
        else {
            // add this message to the sidebar
            let nUsername = ""
            let nPreviewMessages = this.state.messages
            // get the right username
            for (let i = 0; i < this.state.messages.length; i++) {
                if (nPreviewMessages[i].id == message.sender_id) {
                    // TODO splice returns the element it removed
                    nUsername = nPreviewMessages[i].username
                    nPreviewMessages.splice(i, 1)
                    break;
                }
            }
            let newSidebarMessage = {
                message: message.text,
                id: message.sender_id,
                username: nUsername
            }
            nPreviewMessages.unshift(newSidebarMessage)

            this.setState({ messages: nPreviewMessages })
        }
    }



    sendMessage = (text) => {

        this.state.socket.emit("message-send", {
            text: text,
            sender_id: this.state.currentUserID,
            recipient_id: this.state.selectedUserID,
        })

        let m = this.state.conversationMessages;
        let newM = { message: text, id: this.state.currentUserID }
        m.push(newM)
        this.setState({ conversationMessages: m })
    }

    /**
     * @param {int} id the id of the user who's messages we want to look at
     * TODO implement correctly by calling to backend
     */
    getMessages(id) {
        axios.post(conversationURL, {
            recipient_id: id,
        }, { withCredentials: true }).then((response) => {
            console.log(response)
            let newMessages = []// use the dummy data 
            for (let i = 0; i < response.data.length; i++) {
                let message = {
                    id: response.data[i].sender_id,
                    message: response.data[i].message
                }
                newMessages.push(message)
            }
            this.setState({
                conversationMessages: newMessages
            })

        }).catch((response) => {

        })
    }

    handleMessagePreviewClick = (e, id) => {
        e.preventDefault();
        this.getMessages(id)
        this.setState({
            selectedUserID: id
        })
    }

    getSearchResults = (q) => {
        axios.post(searchURL, {
            query: q,
        }, { withCredentials: true }).then((response) => {
            console.log(response)
            let results = []
            for (let i = 0; i < response.data.length; i++) {
                results.push({
                    id: response.data[i].id,
                    username: response.data[i].username
                })
            }
            this.setState({
                searchResults: results
            })

        }).catch((response) => {
            console.log(response)
        })
    }

    // props needed 
    // searchResults {username, id}, onChildClick, 
    // onSearchFormChange(e, id), onSearchButtonClick(e)
    onSearchFormChange = (e) => {
        e.preventDefault()
        this.getSearchResults(e.target.value)

    }

    onSearchButtonClick = (e) => {
        e.preventDefault()

    }

    onSearchResultClick = (e, id) => {
        e.preventDefault()

    }

    render() {
        return (
            <div className="MainPageBackground">
                <SideBar messages={this.state.messages} entryCallback={this.handleMessagePreviewClick}></SideBar>
                <ConversationView messages={this.state.conversationMessages} myID={this.state.currentUserID}></ConversationView>
                <SearchBar searchResults={this.state.searchResults} onChildClick={this.onSearchResultClick}
                    onSearchFormChange={this.onSearchFormChange} onSearchButtonClick={this.onSearchButtonClick} />
                <MessageTypingBar onMessageSend={this.sendMessage} />
            </div>
        );
    }
}

export default MessageMain;