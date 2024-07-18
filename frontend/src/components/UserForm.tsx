import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";

import { userSchema } from "utils";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectUserName } from "store/auth/selectors";
import { editUserProfile } from "store/auth/operations";

import { FormTitle } from "ui/FormTitle";
import { BaseInput } from "ui/BaseInput";
import { LoadingButton } from "ui/LoadingButton";

interface IFormData {
  name: string;
}

export const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const userName = useAppSelector(selectUserName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: userName ?? "",
    },
    resolver: yupResolver(userSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    await dispatch(editUserProfile(data));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <FormTitle variant="body1">Edit profile</FormTitle>

      <BaseInput
        type="text"
        placeholder="Name"
        error={!!errors.name}
        {...register("name")}
      />
      {errors.name && (
        <FormHelperText error>{errors.name.message}</FormHelperText>
      )}

      <LoadingButton style={{ marginTop: 24 }} type="submit" loading={loading}>
        Send
      </LoadingButton>
    </form>
  );
};
