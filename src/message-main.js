import { render } from '@testing-library/react';
import React from 'react';
import { useEffect, useRef } from 'react'
import ReactScrollableList from 'react-scrollable-list';
import './messageMain.css'

// for style see 
// css-tricks on grid layouts

// one entry in the message side bar
// should display a username and the most 
// recent message
class MessageEntry extends React.Component {
    // props must include
    // mostRecentMessage - a string
    // username - a string
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            username: props.username,
            id: props.id
        }
        this.handleClick = props.handleClick;
    }


    render() {
        return (
            <div className="MessageEntry" onClick={(e) => this.handleClick(e, this.state.id)}>
                <h1 className="MessageEntrySender">{this.state.username}</h1>
                <p1 className="MessageEntryBody">{this.state.message}</p1>
            </div>
        );
    }
}

// the side bar fro the messanger main page
class SideBar extends React.Component {

    // props must include 
    // messages - an array of maps
    // the maps must take the following format
    // {username: string, id: int, message : string}
    constructor(props) {
        super(props);

        this.state = {
            messages: props.messages
        }

        this.entryCallback = props.entryCallback;
    }

    render() {
        return (
            <div className="MessageSideBar">
                <ul className="mList">
                    {this.state.messages.map((entry) =>
                        <li>
                            <MessageEntry username={entry.username} id={entry.id} message={entry.message}
                                handleClick={this.entryCallback} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

// represents one message in the current conversation
class ConversationMessage extends React.Component {
    /**
     * @param {*} props contains { message : string, id : int}
     * }
     * where message is the message text and id the id of the recipient
     */
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            message: props.message,
            id: props.id
        };
    }

    render() {
        if (this.state.id === 0) {
            return (
                <div className="ConversationMessageSent">
                    {this.state.message}
                </div>
            );
        }
        else {
            return (
                <div className="ConversationMessageReceived">
                    {this.state.message}
                </div>
            );
        }

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
                        <ConversationMessage id={entry.id} message={entry.message} />
                    </li>
                )}
                <div id="conversationAnchor" ref={messagesEndRef}/>
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
    // props must include
    // a messages array as described in the constructor
    // for a SideBar

    // TODO testing data, needs deletion



    // TODO testing data, needs deletion

    constructor(props) {
        super(props);

        this.state = {
            messages: props.messages,
            conversationMessages: [],
            currentUserID: 0,
            selectedUserID: 1
        }

    }

    sendMessage = (text) => {
        let m = this.state.conversationMessages;
        let newM = { message: text, id: 0 }
        m.push(newM)
        this.setState({ conversationMessages: m })
    }

    /**
     * 
     * @param {int} id the id of the user who's messages we want to look at
     * TODO implement correctly by calling to backend
     */
    getMessages(id) {
        let newMessages = []
        // generate some dummy data 
        for (let i = 0; i < 20; i++) {
            if (Math.floor(Math.random() * 2) === 1) {
                newMessages.push(r)
            }
            else {
                newMessages.push(s)
            }
        }

        // use the dummy data 
        this.setState({
            conversationMessages: newMessages
        })
    }

    getPreviews() {

    }

    handleMessagePreviewClick = (e, id) => {
        e.preventDefault();
        this.getMessages(id)
        this.setState({
            selectedUserID: id
        })
    }

    render() {
        return (
            <div className="MainPageBackground">
                <SideBar messages={this.state.messages} entryCallback={this.handleMessagePreviewClick}></SideBar>
                <ConversationView messages={this.state.conversationMessages}></ConversationView>
                <div className="rightSide" />
                <MessageTypingBar onMessageSend={this.sendMessage} />
            </div>
        );
    }
}

export default MessageMain;