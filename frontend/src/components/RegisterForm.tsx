import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, styled } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { registerSchema } from "utils";
import { useAppDispatch } from "hooks";
import { register as registerUser } from "store/auth/operations";

import { BaseInput } from "ui/BaseInput";
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
  name: string;
  email: string;
  password: string;
}

const defaultValues: IFormData = {
  name: "",
  email: "",
  password: "",
};

export const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<IFormData>({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    const res = await dispatch(registerUser(data));
    console.log(res);
    setLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <BaseInput
        style={{ marginBottom: 14 }}
        type="text"
        placeholder="Enter your name"
        {...register("name")}
      />
      <BaseInput
        style={{ marginBottom: 14 }}
        type="email"
        placeholder="Enter your email"
        {...register("email")}
      />
      <BaseInput
        style={{ marginBottom: 24, paddingRight: 10 }}
        type={showPassword ? "text" : "password"}
        placeholder="Create a password"
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
      <LoadingButton size="small" type="submit" loading={loading}>
        Register Now
      </LoadingButton>
    </form>
  );
};
