import React from 'react';
import ReactScrollableList from 'react-scrollable-list';

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
    }

    render() {
        return (
            <div className="MessageSideBarChild">
                <h1>{this.state.username}</h1>
                <p1>{this.state.message}</p1>
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
    }

    getIDContentMap(entry) {
        return {
            id : entry.username,
            content : <MessageEntry username={entry.username} message={entry.message} />
        }
        debugger;
    }

    render() {
        return (
            <div className="MessageSideBar">
                <ul>
                    {this.state.messages.map((entry) =>
                    <li>
                        <MessageEntry username={entry.username} message={entry.message} />
                    </li>
                    )}
                </ul>
                {/* <ReactScrollableList listItems={this.state.messages.map((entry) => 
                    {this.getIDContentMap(entry)})} heightOfItem={60} /> */}
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

    render() {
        return (
            <div className="MainPageBackground">
                <SideBar messages={this.state.messages}></SideBar>
            </div>
        );
    }
}

export default MessageMain;