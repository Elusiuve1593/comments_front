import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../../redux/slices/auth/sign-in/operations";
import { AppDispatch } from "../../../redux/store";
import { schema } from "./yup/yup";

import Paper from "@mui/material/Paper";

import { LoginForm } from "./login-form/LoginForm";

export interface LoginFormInterface {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInterface>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<LoginFormInterface> = async (data) => {
    const res = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(res)) {
      navigate("/");
    }
  };

  const [blind, setBlind] = useState<boolean>(true);
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 0 }}>
          <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isValid={isValid}
            blind={blind}
            setBlind={setBlind}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};
