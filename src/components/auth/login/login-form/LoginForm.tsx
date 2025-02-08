import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { AuthButton } from "../../../../common/components/AuthButton";
import { BlindButton } from "../../../../common/components/BlindButton";
import { LoginFormInterface } from "../Login";

interface LoginFormProps {
  register: UseFormRegister<LoginFormInterface>;
  handleSubmit: UseFormHandleSubmit<LoginFormInterface, undefined>;
  onSubmit: SubmitHandler<LoginFormInterface>;
  errors: FieldErrors<LoginFormInterface>;
  isValid: boolean;
  blind: boolean;
  setBlind: (blind: boolean) => void;
}

export const LoginForm = memo(
  ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    blind,
    setBlind,
  }: LoginFormProps) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Password</InputLabel>
          <Input
            {...register("password")}
            type={blind ? "password" : "text"}
            error={!!errors.password}
            endAdornment={<BlindButton blind={blind} setBlind={setBlind} />}
          />
          <FormHelperText error>{errors.password?.message}</FormHelperText>
        </FormControl>

        <AuthButton isValid={isValid} text={"Login"} />
      </form>
    );
  }
);
