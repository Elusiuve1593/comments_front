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
import { ProfilePhoto } from "../../../profile-photo/ProfilePhoto";
import { SignUpFormInterface } from "../SignUp";

interface SignUpFormProps {
  register: UseFormRegister<SignUpFormInterface>;
  handleSubmit: UseFormHandleSubmit<SignUpFormInterface, undefined>;
  errors: FieldErrors<SignUpFormInterface>;
  onSubmit: SubmitHandler<SignUpFormInterface>;
  isValid: boolean;
  blind: boolean;
  setBlind: (blind: boolean) => void;
}

export const SignUpForm = memo(
  ({
    register,
    handleSubmit,
    errors,
    onSubmit,
    isValid,
    blind,
    setBlind,
  }: SignUpFormProps) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" sx={{ marginBottom: 3 }} gutterBottom>
          Sign up
        </Typography>
        <ProfilePhoto />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("username")}
            label="First name"
            type="text"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 1 }}>
          <InputLabel>Password</InputLabel>
          <Input
            {...register("password")}
            type={blind ? "password" : "text"}
            error={!!errors.password}
            endAdornment={<BlindButton blind={blind} setBlind={setBlind} />}
          />
          <FormHelperText error>{errors.password?.message}</FormHelperText>
        </FormControl>

        <AuthButton isValid={isValid} text={"Sign up"} />
      </form>
    );
  }
);
