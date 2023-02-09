import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/">
          <div>Site Tetiana Sheichuk</div>
        </Link>

        <div className={styles.buttons}>
          <Link className={styles.button} to="/posts">
            Інформація учням
          </Link>
          <Link className={styles.button} to="/regulatory_framework">
            Нормативно-правова база
          </Link>
          <Link className={styles.button} to="/about">
            Про автора
          </Link>

          {isAuth
              ? (<>
              <div className={styles.dropadd}>
                <div className={styles.additionally}>Детальніше</div>
                <div className={styles.dropaddContent}>
                  <li>
                    <Link to="/add_rf">Створити НП пост</Link>
                  </li>
                  <li>
                    <Link to="/add_post">Написати статтю</Link>
                  </li>
                  <li className={styles.additionallyEnd}>
                    <Link
                      to="/"
                      className={styles.additionallyEnd}
                      onClick={onClickLogout}
                    >
                      Вийти
                    </Link>
                  </li>
                </div>
              </div>
            </>)

              : (
            <>
              <Link className={styles.button} to="/login">
                Увійти
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
