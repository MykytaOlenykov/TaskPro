import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";

import { columnSchema } from "utils";

import { BaseInput } from "ui/BaseInput";
import { ButtonWithIcon } from "ui/ButtonWithIcon";
import { FormTitle } from "ui/FormTitle";

import type { IColumn } from "types";

interface IForm {
  name: string;
}

interface IProps {
  columnName?: string;
  title: string;
  buttonText: string;
  onSubmitForm: (data: Pick<IColumn, "name">) => void;
}

export const ColumnForm: React.FC<IProps> = ({
  columnName,
  title,
  buttonText,
  onSubmitForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: columnName,
    },
    resolver: yupResolver(columnSchema),
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    onSubmitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <FormTitle variant="body1">{title}</FormTitle>

      <BaseInput
        type="text"
        placeholder="Title"
        error={!!errors.name}
        {...register("name")}
      />
      {errors.name && (
        <FormHelperText error>{errors.name.message}</FormHelperText>
      )}

      <ButtonWithIcon style={{ marginTop: 24 }} type="submit">
        {buttonText}
      </ButtonWithIcon>
    </form>
  );
};
