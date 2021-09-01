import React, { useState, useEffect, useRef } from "react";
import styles from "./BettingModal.styles";
import * as yup from "yup";
import countDown from "./helpers/countDown";
import socket from "../../../helper/socket";

let betInputSchema = yup.object().shape({
  betAmount: yup
    .number()
    .required()
    .max(1000, "You do not have enough.")
    .min(0, "You cannot use a negative number"),
});

const BettingModal = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [timer, setTimer] = useState(20);
  const countDownRef = useRef(null);
  const timerIdRef = useRef(null);
  const roomid = localStorage.getItem("roomid");
  let currentMoney = 1000;

  const handleSubmitBet = (e) => {
    e.preventDefault(0);
    betInputSchema
      .validate({ betAmount })
      .then(({ betAmount }) => {
        clearInterval(timerIdRef.current);

        socket.emit("playerBet", { roomid, betAmount });
      })
      .catch(function (err) {
        setInputErrorMessage(err.message);
      });
  };

  const addToBetAmount = (amount) => {
    setBetAmount(betAmount + amount);
  };

  const clearBet = () => {
    setBetAmount(0);
  };

  const updateTimer = (num, id) => {
    countDownRef.current = num;
    timerIdRef.current = id;

    setTimer(countDownRef.current);
  };
  const stopTimer = () => {
    clearInterval(timerIdRef.current);
    socket.emit("playerBet", { roomid, betAmount: 0 });
  };

  useEffect(() => {
    countDownRef.current = timer;
    countDown(countDownRef.current, updateTimer, stopTimer);
    return () => {};
  }, []);
  return (
    <div className={styles.BettingModal()}>
      <div className={styles.BettingModalContainer()}>
        <div className={styles.CountDown()}>{timer}</div>
        <div className={styles.Header()}>Place your bets.</div>
        <div className={styles.ErrorMessage()}>
          {inputErrorMessage ? inputErrorMessage : ""}
        </div>

        <form className={styles.Form()} onSubmit={handleSubmitBet} action="">
          <div className={styles.Main()}>
            <fieldset className={styles.FieldSet()}>
              <input
                onChange={(e) => {
                  setBetAmount(e.currentTarget.value);
                }}
                className={styles.Input()}
                value={betAmount}
                type="number"
              />
            </fieldset>
            <div className={styles.NumDisplay()}>
              <div className={styles.Nums()}>{`/${currentMoney}`}</div>
            </div>
          </div>
          <div className={styles.ButtonsContainer()}>
            <div
              onClick={() => {
                addToBetAmount(1);
              }}
              className={styles.Button()}
            >
              1
            </div>
            <div
              onClick={() => {
                addToBetAmount(5);
              }}
              className={styles.Button()}
            >
              5
            </div>
            <div
              onClick={() => {
                addToBetAmount(20);
              }}
              className={styles.Button()}
            >
              20
            </div>
            <div
              onClick={() => {
                addToBetAmount(100);
              }}
              className={styles.Button()}
            >
              100
            </div>
            <div
              onClick={() => {
                clearBet();
              }}
              className={styles.ButtonClear()}
            >
              Clear
            </div>
          </div>
          <button type="submit" className={styles.ButtonSubmit()}>
            Bet
          </button>
        </form>
      </div>
    </div>
  );
};

export default BettingModal;
