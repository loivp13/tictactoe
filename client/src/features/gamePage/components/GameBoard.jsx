import React, { useState } from "react";
import styles from "./GameBoard.styles";
import socket from "../../../helper/socket";
import { useHistory } from "react-router-dom";

export default function GameBoard({ playerCount }) {
  let history = useHistory();

  let [gameBoard, setGameBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  let [isGameRunning, setIsGameRunning] = useState(false);
  let [permssionLvl, setPermissionLvl] = useState(
    localStorage.getItem("permissionLvl")
  );

  const applyBorder = (i, j) => {
    if (i > 1 && j !== 2) {
      return "border-r";
    } else if (j <= 1) {
      return "border-r border-b";
    } else if (j === 2 && i === 2) {
      return "";
    } else {
      return "border-b";
    }
  };

  const handleLogoutClick = () => {
    socket.disconnect();
    history.push("/");
  };
  return (
    <div className={styles.GameBoard()}>
      <div onClick={handleLogoutClick} className={styles.LogoutButton()}>
        Logout
      </div>

      <div className={styles.PlayButton(playerCount)}>
        {permssionLvl === "client" ? "Waiting for Host" : "Play"}
      </div>
      <main className={styles.Main()}>
        {gameBoard.map((row, i) => {
          return row.map((item, j) => {
            if (item === "X") {
              return (
                <div
                  key={`${i}${j}`}
                  className={styles.Tile(applyBorder(i, j))}
                >
                  X
                </div>
              );
            } else if (item === "Y") {
              return (
                <div
                  key={`${i}${j}`}
                  className={styles.Tile(applyBorder(i, j))}
                >
                  Y
                </div>
              );
            } else {
              return (
                <div
                  key={`${i}${j}`}
                  className={styles.Tile(applyBorder(i, j))}
                ></div>
              );
            }
          });
        })}
      </main>
    </div>
  );
}
