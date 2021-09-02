import React, { useEffect, useState } from "react";
import styles from "./ScoreBoard.styles";
import { cloneDeep } from "lodash";
import socket from "../../../helper/socket";

const ScoreBoard = () => {
  let user = localStorage.getItem("username");
  let oppponent = localStorage.getItem("opponent") || "Waiting...";

  let score = useState({
    [user]: 0,
    [oppponent]: 0,
  });
  useEffect(() => {
    socket.on("gameOver", ({ username }) => {
      let cloneScore = cloneDeep(score);
      for (let player in cloneScore) {
        if (player === username) {
          cloneScore[player] += 1;
        }
      }
    });
    return () => {
      socket.off("gameOver");
    };
  }, []);
  return (
    <div className={styles.ScoreBoard()}>
      <div className={styles.Container()}>
        <div className={styles.Box()}>{`You : ${score[user]} `}</div>
        <div className={styles.Box()}>{`Opponent : ${score[oppponent]} `}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
