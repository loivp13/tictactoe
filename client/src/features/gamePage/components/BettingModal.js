import { current } from "immer";
import React from "react";
import { rootCertificates } from "tls";
import styles from "./BettingModal.styles";
const BettingModal = () => {
  let currentMoney = 1000;
  return (
    <div className={styles.BettingModal()}>
      <div className={styles.BettingModalContainer()}>
        <div className={styles.Header()}>Place your bets</div>
        <div className={styles.Main()}>
          <input
            max={1000}
            placeholder={0}
            className={styles.Input()}
            type="number"
          />
          <div className={styles.NumDisplay()}>/{currentMoney}</div>
        </div>
        <div className={styles.ButtonsContainer()}>
          <div className={styles.Button()}>1</div>
          <div className={styles.Button()}>5</div>
          <div className={styles.Button()}>20</div>
          <div className={styles.Button()}>100</div>
        </div>
      </div>
    </div>
  );
};

export default BettingModal;
