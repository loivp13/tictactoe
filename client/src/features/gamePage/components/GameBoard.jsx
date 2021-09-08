import React, { useState, useEffect } from "react";
import styles from "./GameBoard.styles";
import socket from "../../../helper/socket";
import { useHistory } from "react-router-dom";
import checkForWinner from "./helpers/checkForWinner.tsx";
import { cloneDeep } from "lodash";
import BettingModal from "./BettingModal";
import RestartGameModal from "./RestartGameModal";
import { clearLocalStorage } from "../../../helper/clearLocalStorage";

export default function GameBoard({ playerCount }) {
  let history = useHistory();
  let roomid = localStorage.getItem("roomid");
  let username = localStorage.getItem("username");
  let [playersTurn, setPlayersTurn] = useState("");
  let [gameStatus, setGameStatus] = useState("waiting for players");
  let [messages, setMessages] = useState("");
  const [cash, setCash] = useState(1000);
  //round indicated how many players has played after a  single bet
  // 0 == no players has played
  // 1 == 1 player played;
  // 2 == 2 players played -> start betting again -> reset to 0
  let [rounds, setRounds] = useState(0);

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
    socket.emit("userLoggedOut", {
      permissionLvl,
      roomid,
      username,
    });
    socket.connected ? socket.disconnect() : clearLocalStorage();
    history.push("/");
  };

  const handlePlayClick = () => {
    if (permissionLvl === "host" && playerCount > 1) {
      setIsGameRunning(true);
      socket.emit("gameStart", {
        roomid,
      });
    }
  };

  const handleRestartGameClick = () => {
    if (permissionLvl === "host" && playerCount > 1) {
      socket.emit("restartGame", { roomid });
    }
  };

  const updateBoard = (row, col) => {
    let cloneBoard = cloneDeep(gameBoard);

    //check if valid pick
    if (!cloneBoard[row][col]) {
      //if valid update socket
      cloneBoard[row][col] = permissionLvl === "host" ? "X" : "O";
      return cloneBoard;
    } else {
      // make user pick again
      setMessages("Not a valid play");
    }
    return false;
  };

  const handleBoardClick = (e) => {
    if (playersTurn === username) {
      let row = e.currentTarget.getAttribute("data-row");

      let col = e.currentTarget.getAttribute("data-col");

      let cloneBoard = updateBoard(row, col);
      if (cloneBoard) {
        setPlayersTurn("");
        //check if winning play
        if (checkForWinner(cloneBoard)) {
          //true
          socket.emit("gameEnded", {
            roomid,
            cloneBoard,
            winner: username,
          });
        } else {
          //false
          socket.emit("updateBoard", {
            roomid,
            cloneBoard,
            rounds: rounds + 1,
          });
        }
      }
    } else {
      setMessages("Opponent's turn");
    }
  };

  const renderTurn = () => {
    return (
      <div>{playersTurn === username ? "Your Turn" : "Opponent's turn"}</div>
    );
  };

  useEffect(() => {
    socket.on("startGame", () => {
      setIsGameRunning(true);
      setGameStatus("waiting for bets");
    });

    socket.on("betEnded", ({ betAmount, username: highestBidder }) => {
      setGameStatus(`waiting for players's move`);
      if (highestBidder === username) {
        setCash(cash - betAmount);
      }
      setPlayersTurn(highestBidder);
    });

    socket.on(
      "nextPlayersTurn",
      ({ username: userPlayed, cloneBoard, rounds }) => {
        setGameBoard(cloneBoard);
        setPlayersTurn(userPlayed === username ? "" : username);
        setRounds(rounds);
      }
    );

    socket.on("loggingGuestOut", ({ content }) => {
      clearLocalStorage();
      localStorage.setItem("hostEndedSession", content);
      history.push("/");
    });
    socket.on("playersPlaceBet", ({ cloneBoard }) => {
      setRounds(false);
      setGameBoard(cloneBoard);
      setPlayersTurn("");
      setGameStatus("waiting for bets");
    });

    socket.on("roundEnded", ({ cloneBoard }) => {
      setGameBoard(cloneBoard);
      setRounds(0);
      setTimeout(() => {
        setGameStatus("waiting for bets");
      }, 1000);
    });

    socket.on("gameOver", ({ cloneBoard, username }) => {
      setGameBoard(cloneBoard);
      setRounds(0);
      setGameStatus("gameOver");
    });

    socket.on("restartingGame", () => {
      setGameBoard([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
      setCash(1000);
      socket.emit("gameStart", { roomid });
    });

    return () => {
      socket.off("startGame");
      socket.off("betEnded");
      socket.off("nextPlayersTurn");
      socket.off("playersPlaceBet");
      socket.off("gameOver");
      socket.off("roundEnded");
      socket.off("restartingGame");
    };
  }, [gameBoard]);

  return (
    <div className={styles.GameBoard()}>
      {gameStatus === "waiting for bets" ? (
        <BettingModal cash={cash} setGameStatus={setGameStatus}></BettingModal>
      ) : (
        ""
      )}
      {gameStatus === "gameOver" ? (
        <RestartGameModal
          restartGame={handleRestartGameClick}
          permissionLvl={permissionLvl}
          logOut={handleLogoutClick}
        />
      ) : (
        ""
      )}
      <div className={styles.Messages()}>{messages ? messages : "mes"}</div>
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
            } else if (item === "O") {
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
                  O
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
