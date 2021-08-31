import React, { useState, useEffect } from "react";
import styles from "./GameBoard.styles";
import socket from "../../../helper/socket";
import { useHistory } from "react-router-dom";
import checkForWinner from "./helpers/checkForWinner.tsx";
import { cloneDeep } from "lodash";
import BettingModal from "../components/BettingModal";
import { clearLocalStorage } from "../../../helper/clearLocalStorage";

export default function GameBoard({ playerCount }) {
  let history = useHistory();
  let roomid = localStorage.getItem("roomid");
  let username = localStorage.getItem("username");
  let [playersTurn, setPlayersTurn] = useState("");
  let [gameStatus, setGameStatus] = useState("waiting for players");

  let [gameBoard, setGameBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  let [isGameRunning, setIsGameRunning] = useState(false);
  let [permissionLvl, setPermissionLvl] = useState(
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
    socket.connected ? socket.disconnect() : clearLocalStorage();
    history.push("/");
  };
  const handlePlayClick = () => {
    if (permissionLvl === "host") {
      setIsGameRunning(true);
      socket.emit("gameStart", {
        roomid,
      });
    }
  };
  const handleBoardClick = (e) => {
    if (playersTurn === username) {
      let row = e.currentTarget.getAttribute("data-row");
      let col = e.currentTarget.getAttribute("data-col");
      let cloneBoard = cloneDeep(gameBoard);
      cloneBoard[row][col] = "X";
      setGameBoard(cloneBoard);
    }
  };

  const renderTurn = () => {
    return <div>turn</div>;
  };

  useEffect(() => {
    socket.on("startGame", () => {
      setIsGameRunning(true);
      setGameStatus("waiting for bets");
    });

    socket.on("betEnded", ({ betAmount, username }) => {
      setGameStatus(`waiting for players's move`);
      setPlayersTurn(username);
    });
    return () => {
      socket.off("gameStart");
    };
  }, [gameBoard]);
  return (
    <div className={styles.GameBoard()}>
      {gameStatus === "waiting for bets" ? <BettingModal></BettingModal> : ""}

      <div onClick={handleLogoutClick} className={styles.LogoutButton()}>
        Logout
      </div>

      <div onClick={handlePlayClick} className={styles.PlayButton(playerCount)}>
        {isGameRunning
          ? renderTurn()
          : permissionLvl === "client"
          ? "Waiting for Host"
          : "Play"}
        {}
      </div>
      <main className={styles.Main()}>
        {gameBoard.map((row, i) => {
          return row.map((item, j) => {
            if (item === "X") {
              return (
                <div
                  onClick={(e) => {
                    handleBoardClick(e);
                  }}
                  data-row={i}
                  data-col={j}
                  key={`${i}${j}`}
                  className={styles.Tile(applyBorder(i, j))}
                >
                  X
                </div>
              );
            } else if (item === "Y") {
              return (
                <div
                  onClick={(e) => {
                    handleBoardClick(e);
                  }}
                  data-row={i}
                  data-col={j}
                  key={`${i}${j}`}
                  className={styles.Tile(applyBorder(i, j))}
                >
                  Y
                </div>
              );
            } else {
              return (
                <div
                  onClick={(e) => {
                    handleBoardClick(e);
                  }}
                  data-row={i}
                  data-col={j}
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
