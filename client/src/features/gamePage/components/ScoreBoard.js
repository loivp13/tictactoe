import React, { useEffect, useState } from "react";
import styles from "./ScoreBoard.styles";
import { clone, cloneDeep } from "lodash";
import socket from "../../../helper/socket";

const ScoreBoard = () => {
  let [user, setUser] = useState(localStorage.getItem("username"));
  let [oppponent, setOpponent] = useState(
    localStorage.getItem("opponent") || "Invite someone!"
  );

  let [scoreboard, setScoreboard] = useState({
    [user]: 0,
    [oppponent]: 0,
  });
  useEffect(() => {
    socket.on("userJoin", ({ username }) => {
      if (username !== user) {
        setOpponent(username);
        setScoreboard({
          ...scoreboard,
          [username]: 0,
        });
      }
    });
    socket.on("updatingGuest", ({ hostname }) => {
      if (hostname !== user) {
        setOpponent(hostname);
        setScoreboard({
          ...scoreboard,
          [hostname]: 0,
        });
      }
    });
    socket.on("gameOver", ({ username }) => {
      let cloneScore = cloneDeep(scoreboard);
      console.log(cloneScore);
      for (let player in cloneScore) {
        if (player === username) {
          cloneScore[player] += 1;
          console.log(cloneScore, player);
          setScoreboard(cloneScore);
        }
      }
    });
    return () => {
      socket.off("userJoin");
      socket.off("gameOver");
    };
  }, []);
  return (
    <div className={styles.ScoreBoard()}>
      <div className={styles.Container()}>
        <div className={styles.Box()}>{`${user} : ${scoreboard[user]} `}</div>
        <div
          className={styles.Box()}
        >{`${oppponent} : ${scoreboard[oppponent]} `}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
