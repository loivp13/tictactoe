import React from "react";
import socket from "../../helper/socket";
import styles from "./LandingPage.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup.object({
  join_username: yup.string().required("Username is required"),
});

export default function LandingPage({ setTheme, theme }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const handleCreateRoom = (e) => {
    e.preventDefault();
    console.log("connecting to socket.io");
    socket.connect();
  };
  const handleJoinRoom = (e) => {
    e.preventDefault();
    console.log("connecting to socket.io");
    socket.connect();
  };
  return (
    <div className={styles.LandingPage()}>
      <header className={styles.Header()}> Tic Tac Toe</header>
      <div className={styles.MainContainer()}>
        <div className={styles.BoxLeft()}>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Please enter a username" />
            <button type="submit">submit</button>
          </form>
        </div>
        <div className={styles.BoxRight()}>
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Please enter a username" />
            <input type="text" placeholder="Please enter room Id." />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
