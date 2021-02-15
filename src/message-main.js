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
    }

    render() {
        return (
            <div className="MessageEntry">
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
    }

    getIDContentMap(entry) {
        return {
            id : entry.username,
            content : <MessageEntry username={entry.username} message={entry.message} />
        }
    }

    render() {
        return (
            <div className="MessageSideBar">
                <ul className="mList">
                    {this.state.messages.map((entry) =>
                    <li>
                        <MessageEntry username={entry.username} message={entry.message} />
                    </li>
                    )}
                </ul>
                {/* <ReactScrollableList listItems={[{id: "test1", content: <p>testparagraph</p>},
                                                {id: "test2", content: <p>testparagraph</p>},
                                                {id: "test3", content: <p>testparagraph</p>},
                                                {id: "test4", content: <p>testparagraph</p>},]} heightOfItem={60} maxItemsToRender={2} /> */}
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

    render() {
        return (
            <div className="MainPageBackground">
                <SideBar messages={this.state.messages}></SideBar>
                <ConversationView></ConversationView>
                <div className="rightSide" />
            </div>
        );
    }
}

export default MessageMain;