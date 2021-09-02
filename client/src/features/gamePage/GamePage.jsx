import React, { useState, useEffect } from "react";
import styles from "./GamePage.styles";
import socket from "../../helper/socket";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import checkIfLogin from "../../helper/checkIfLogin";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

//schema for chat form
const chatMessageSchema = yup.object().shape({
  chatMessage: yup.string().required(""),
});

export default function GamePage() {
  //navigation wtih history
  let history = useHistory();
  let roomid = localStorage.getItem("roomid");
  let username = localStorage.getItem("username");

  let [messages, setMessages] = useState([`Welcome ${username}!`]);
  let [playerCount, setPlayerCount] = useState(
    localStorage.getItem("playersOnline")
  );

  //reroute to homepage if no username or roomid
  checkIfLogin(username, roomid, history);
  //useForm Hook
  const {
    handleSubmit: formHandleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(chatMessageSchema) });

  //handles when submitting a chat message
  const handleChatSubmit = (data) => {
    console.log(data);
    socket.emit("submitChatMessage", {
      content: data,
      roomid,
    });
    // reset();
  };

  useEffect(() => {
    console.log("chatrender");
    socket.on("updateChatRoom", (data) => {
      setMessages([...messages, data.content.chatMessage]);
    });
    return () => {
      socket.off("updateChatRoom");
    };
  }, [messages]);

  useEffect(() => {
    console.log("socket render");
    //socket listen
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("err.message");
        history.push("/");
      }
    });

    socket.on("userJoin", (data) => {
      let playersCount = localStorage.getItem("playersOnline");
      setPlayerCount(++playerCount);
      setMessages([...messages, data.content]);
    });

    return () => {
      socket.disconnect();
      socket.off("connect_error");
      socket.off("userJoin");
    };
  }, []);

  return (
    <div className={styles.GamePage()}>
      <main className={styles.Main()}>
        <header className={styles.Header()}>Tic Tac Toe</header>
        <ScoreBoard></ScoreBoard>
        <div className={styles.Row()}>
          <div className={styles.ChatBox()}>
            <div className={styles.RoomId()}>
              Room Id: <span className="text-red-500">{roomid}</span>
            </div>
            <div className={styles.MessageBoard()}>
              <ul>
                {messages.map((message, i) => {
                  return (
                    <li className={styles.MessageBoardItem()} key={i}>
                      {message}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.ChatInputContainer()}>
              <form
                className={styles.ChatForm()}
                onSubmit={formHandleSubmit(handleChatSubmit)}
              >
                <input
                  {...register("chatMessage")}
                  className={styles.ChatInput()}
                  type="text"
                />
                <button className={styles.ChatButton()} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
          <GameBoard playerCount={playerCount}></GameBoard>
        </div>
      </main>
    </div>
  );
}
