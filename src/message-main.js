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
        this.state = {
            message: props.message,
            id: props.id
        };
    }

    render() {
        if (this.props.id == 0) {
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



function ConversationView(props){
    console.log(props)
    return (
        <div className="ConversationView">
            <ul className="ConversationList">
                {props.messages.map((entry) =>
                    <li>
                        <ConversationMessage id={entry.id} message={entry.message} />
                    </li>
                )}
            </ul>
        </div>
    );
}


const s = { message: "send send", id: 0 };

const r = { message: "receive receive", id: 2 };



const conversations = [
    [s, r, r, r, s, s, s],
    [{ message: "one", id: 2 }, { message: "two", id: 0 }, { message: "three", id: 2 }, s, r, s, s],
    [r, r, r, r, r, r, r, s],
    [s, r, s, r, s, s, s, s, r, r],
    [s, r, s, r, s, s, s, s, s, s],
    [s, r, r, r, s, s, s, r, s, s, r,],
    [s, r, r, r, s, r, s, r, s],
    [s, r, r, r, s, s, s],
    [s, r, r, r, s, s, s, r, r, s, r, r, r, r],
    [s, r, r, r, s, s, s],
    [s, r, s, r, s, s, s],
    [s, r, r, r, s, s, s]
]
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
            conversationMessages: []
        }

    }

    handleMessagePreviewClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        this.setState({
            conversationMessages: conversations[id]
        })
        console.log(this.state);
    }

    render() {
        return (
            <div className="MainPageBackground">
                <SideBar messages={this.state.messages} entryCallback={this.handleMessagePreviewClick}></SideBar>
                <ConversationView messages={this.state.conversationMessages}></ConversationView>
                <div className="rightSide" />
            </div>
        );
    }
}

export default MessageMain;