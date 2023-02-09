import styles from "./Login.module.css";
import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      alert("Помилка авторизації");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Помилка авторизації");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в акаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Необхідно вказати пошту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Необхідно вказати пароль" })}
          fullWidth
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Вхід
        </Button>
      </form>
    </Paper>
  );
};
