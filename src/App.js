import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

import Message from "./Message";
import "./App.css";
import db from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please Enter your name"));
  }, []);

  const sendMessage = (e) => {
    // all the logic to send the message
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <img
        src="https://scontent.fblr1-5.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&_nc_sid=6825c5&_nc_ohc=sG4tNNIjZ5gAX8sr9hg&_nc_ht=scontent.fblr1-5.fna&oh=09e6465195e0c05853d11c771b782cc4&oe=5F54BAB3"
        alt="Messenger"
      />
      <h1>Messenger Clone</h1>
      <h2>
        Welcome {username == null || username == "" ? "Unknown User" : username}
      </h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__iconButton"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove className="app__flip">
        {messages.map(({ id, message }) => (
          <Message username={username} message={message} key={id} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
