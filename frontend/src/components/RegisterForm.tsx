import React, { useState } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
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
import { HelperText } from "ui/HelperText";

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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    const result = await dispatch(registerUser(data));
    setLoading(false);
    if (isFulfilled(result)) {
      navigate("/auth/login");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <BaseInput
        type="text"
        placeholder="Enter your name"
        error={!!errors.name}
        {...register("name")}
      />
      {errors.name && <HelperText error>{errors.name.message}</HelperText>}
      <BaseInput
        style={{ marginTop: 14 }}
        type="email"
        placeholder="Enter your email"
        error={!!errors.email}
        {...register("email")}
      />
      {errors.email && <HelperText error>{errors.email.message}</HelperText>}
      <BaseInput
        style={{ marginTop: 14, paddingRight: 10 }}
        type={showPassword ? "text" : "password"}
        placeholder="Create a password"
        error={!!errors.password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              type="button"
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
        Register Now
      </LoadingButton>
    </form>
  );
};
