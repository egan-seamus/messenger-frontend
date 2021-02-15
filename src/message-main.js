import React from 'react';
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
            username: props.username
        }
        this.handleClick = props.handleClick;
    }


    render() {
        return (
            <div className="MessageEntry" onClick={(e) => this.handleClick(e, this.state.message)}>
                <h1 className= "MessageEntrySender">{this.state.username}</h1>
                <p1 className= "MessageEntryBody">{this.state.message}</p1>
            </div>
        );
    }
}

// the side bar fro the messanger main page
class SideBar extends React.Component {

    // props must include 
    // messages - an array of maps
    // the maps must take the following format
    // {username: string, message : string}
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
                        <MessageEntry username={entry.username} message={entry.message} 
                        handleClick = {this.entryCallback} />
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}

class ConversationView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="ConversationView">

            </div>
        );
    }
}

// the messanger main page
class MessageMain extends React.Component {
    // props must include
    // a messages array as described in the constructor
    // for a SideBar
    constructor(props) {
        super(props);

        this.state = {
            messages: props.messages
        }

    }

    handleMessagePreviewClick(e, name) {
        e.preventDefault();
        console.log(name);
    }

    render() {
        return (
            <div className="MainPageBackground">
                <SideBar messages={this.state.messages} entryCallback = {this.handleMessagePreviewClick}></SideBar>
                <ConversationView></ConversationView>
                <div className="rightSide" />
            </div>
        );
    }
}

export default MessageMain;