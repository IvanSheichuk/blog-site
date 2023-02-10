import React from "react";
import styles from "./ImgBlock.module.css";

export const ImgBlock = ({ imgUrl }) => {
  return (
    <>
      {imgUrl.map((name) => (
        <img
          className={styles.item}
          alt=""
          onClick={() => {
            window.open(process.env.REACT_APP_BASE_PIC_URL + name);
          }}
          src={process.env.REACT_APP_BASE_PIC_URL + name}
        />
      ))}
    </>
  );
};
