import React from "react";
import styles from "./TagsBlock.module.css";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <>
      <div className={styles.based}>
        <div className={styles.root}>
          <div>Список останіх тегів</div>
          {(isLoading ? [...Array(7)] : items).map((name, i) => (
            <a className={styles.item} key={i} href={`/tags/${name}`}>
              #{name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
