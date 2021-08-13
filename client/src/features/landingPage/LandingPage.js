import React from "react";
import socket from "../../helper/socket";
import styles from "./LandingPage.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const createRoomSchema = yup.object().shape({
  createRoom_username: yup.string().required("Username is required."),
});
const joinRoomSchema = yup.object().shape({
  joinRoom_username: yup.string().required("Username is required"),
  joinRoom_roomid: yup.string().required("Room id is required"),
});

export default function LandingPage({}) {
  const {
    register: register_createRoom,
    handleSubmit: handle_createRoom,
    formState: { errors: createRoomErrors },
  } = useForm({ resolver: yupResolver(createRoomSchema) });

  const {
    register: register_joinRoom,
    handleSubmit: handle_joinRoom,
    formState: { errors: joinRoomErrors },
  } = useForm({ resolver: yupResolver(joinRoomSchema) });

  const submitCreateRoom = (data, e) => {
    console.log(data);
    socket.auth = { user: "name" };
    socket.connect();
  };

  const submitJoinRoom = (data, e) => {
    console.log("connecting to socket.io");
    socket.auth = { roomid: data.joinRoom_roomid };
    socket.connect();
  };

  return (
    <div className={styles.LandingPage()}>
      <header className={styles.Header()}> Tic Tac Toe</header>

      <div className={styles.MainContainer()}>
        <div className={styles.BoxLeft()}>
          <div className={styles.ErrorMessages()}>
            {createRoomErrors.createRoom_username &&
              createRoomErrors.createRoom_username.message}
          </div>
          <form
            className={styles.Form()}
            onSubmit={handle_createRoom(submitCreateRoom)}
          >
            <header className={styles.FormHeader()}>Create a Room</header>
            <label className={styles.Label()} htmlFor="createRoom_username">
              Username
            </label>
            <input
              id="createRoom_username"
              className={styles.Input()}
              type="text"
              placeholder="Please enter a username"
              {...register_createRoom("createRoom_username")}
            />
            <button className={styles.Button()} type="submit">
              submit
            </button>
          </form>
        </div>

        <div className={styles.BoxRight()}>
          <div className={styles.ErrorMessages()}>
            {joinRoomErrors.joinRoom_username &&
              joinRoomErrors.joinRoom_username.message}
            {joinRoomErrors.joinRoom_roomid &&
              joinRoomErrors.joinRoom_roomid.message}
          </div>
          <form
            className={styles.Form()}
            onSubmit={handle_joinRoom(submitJoinRoom)}
          >
            <header className={styles.FormHeader()}>Join a Room</header>
            <label htmlFor="joinRoom_username">Username</label>
            <input
              id="joinRoom_username"
              className={styles.Input()}
              type="text"
              placeholder="Please enter a username"
              {...register_joinRoom("joinRoom_username")}
            />
            <label htmlFor="joinRoom_roomid">Username</label>

            <input
              id="joinRoom_roomid"
              className={styles.Input()}
              type="text"
              placeholder="Please enter room id."
              {...register_joinRoom("joinRoom_roomid")}
            />
            <button className={styles.Button()} type="submit">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
