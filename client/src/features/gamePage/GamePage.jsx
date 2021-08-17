import React, { useState, useEffect } from "react";
import styles from "./GamePage.styles";
import socket from "../../helper/socket";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";

//schema for chat form
const chatMessageSchema = yup.object().shape({
  chatMessage: yup.string().required(""),
});

export default function GamePage() {
  let roomid = localStorage.getItem("roomid");
  let [messages, setMessages] = useState([`Connected to room ${roomid}`]);

  //navigation wtih history
  let history = useHistory();

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
    reset();
  };

  useEffect(() => {
    //socket listen
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("err.message");
        history.push("/");
      }
    });
    socket.on("updateChatRoom", (data) => {
      setMessages([...messages, data.content.chatMessage]);
    });
    return () => {
      socket.off("connect_error");
      socket.off("updateChatRoom");
    };
  }, [messages]);

  return (
    <div className={styles.GamePage()}>
      <main className={styles.Main()}>
        <header className={styles.Header()}>Tic Tac Toe</header>
        <div className={styles.ScoreBoard()}>score board</div>
        <div className={styles.Row()}>
          <div className={styles.ChatBox()}>
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
          <div className={styles.RightBox()}>game board</div>
        </div>
      </main>
    </div>
  );
}
