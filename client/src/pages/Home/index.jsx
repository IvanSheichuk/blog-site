import React from "react";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.firstContent}>
      <div className={styles.gridFirst}>
        <img
          src={process.env.REACT_APP_HOME_PIC_URL}
          alt=" "
          className={styles.firstItem}
        />
        <p className={styles.secondItem}>Сайт вчителя історії Тетяни Шейчук</p>
        <p className={styles.thirdItem}>
          Моє життєве кредо: "Роби справу чесно з душею – і твоє до тебе прийде"
        </p>
      </div>
    </div>
  );
};