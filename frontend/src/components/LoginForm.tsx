import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, styled } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { logInSchema } from "utils";
import { useAppDispatch, useAppSelector } from "hooks";
import { logIn } from "store/auth/operations";
import { selectUserEmail } from "store/auth/selectors";

import { BaseInput } from "ui/BaseInput";
import { HelperText } from "ui/HelperText";
import { LoadingButton } from "ui/LoadingButton";

const VisibilityIcon = styled(VisibilityOutlinedIcon)(() => ({
  width: 18,
  height: 18,
}));

const VisibilityOffIcon = styled(VisibilityOffOutlinedIcon)(() => ({
  width: 18,
  height: 18,
}));

interface IFormData {
  email: string;
  password: string;
}

const defaultValues: IFormData = {
  email: "",
  password: "",
};

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(selectUserEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: { ...defaultValues, email: userEmail ?? "" },
    resolver: yupResolver(logInSchema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    await dispatch(logIn(data));
    setLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <BaseInput
        type="email"
        placeholder="Enter your email"
        error={!!errors.email}
        {...register("email")}
      />
      {errors.email && <HelperText error>{errors.email.message}</HelperText>}
      <BaseInput
        style={{ marginTop: 24, paddingRight: 10 }}
        type={showPassword ? "text" : "password"}
        placeholder="Confirm a password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              style={{ marginRight: 0 }}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        {...register("password")}
      />
      {errors.password && (
        <HelperText error>{errors.password.message}</HelperText>
      )}
      <LoadingButton style={{ marginTop: 24 }} type="submit" loading={loading}>
        Log In Now
      </LoadingButton>
    </form>
  );
};
