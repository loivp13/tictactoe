import React, { useState, useEffect, useRef } from "react";
import styles from "./RestartGameModal.styles";
import socket from "../../../helper/socket";

const RestartGameModal = ({ restartGame, permissionLvl, logOut }) => {
  return (
    <div className={styles.RestartGameModal()}>
      <div className={styles.Container()}>
        <div className={styles.Header()}>
          {permissionLvl === "host"
            ? "Restart the game"
            : "Waiting for host to restart game."}
        </div>
        <div className={styles.Main()}>
          {permissionLvl === "host" ? (
            <div className="flex justify-around items-center">
              <div onClick={restartGame} className={styles.Button()}>
                Restart Game
              </div>
              <div onClick={logOut} className={styles.ButtonRed()}>
                End Session
              </div>
            </div>
          ) : (
            <div onClick={logOut} className={styles.ButtonRed()}>
              End Session
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestartGameModal;
