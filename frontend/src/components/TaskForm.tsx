import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";

import { selectTaskPriorities } from "store/tasks/selectors";
import { useAppSelector } from "hooks";
import { convertToUtcDateString, taskSchema } from "utils";

import { BaseInput } from "ui/BaseInput";
import { ButtonWithIcon } from "ui/ButtonWithIcon";
import { FormTitle } from "ui/FormTitle";
import { DatePicker } from "ui/DatePicker";

import type { ITask } from "types";

import CheckedRadioBtnSVG from "assets/images/checked-radio-btn.svg?react";

const DescriptionInput = styled(BaseInput)(({ theme }) => ({
  marginTop: 14,
  padding: 0,
  lineHeight: 1.29,
  scrollbarColor: `${theme.palette.background.scrollThumb} ${theme.palette.background.scrollBar}`,
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  marginBottom: 4,
  fontWeight: 400,
  fontSize: 12,
  letterSpacing: "-0.02em",
  color: theme.palette.text.label,
}));

const StyledRadioGroup = styled(RadioGroup)({
  flexDirection: "row",
  gap: 8,
});

const RadioBtn = styled(Radio)(({ theme }) => ({
  padding: 0,
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  },
  "&.Mui-checked": {
    color: theme.palette.text.primary,
  },
}));

const CheckedRadioBtnIcon = styled(CheckedRadioBtnSVG)<{ color?: string }>(
  ({ color }) => ({
    width: 16,
    height: 16,
    color,
  })
);

const RadioBtnIcon = styled("div")<{ bgColor?: string }>(({ bgColor }) => ({
  width: 16,
  height: 16,
  backgroundColor: bgColor,
  borderRadius: "100%",
}));

interface IForm {
  name: string;
  comment?: string;
  deadline: Date;
  priority_id?: string;
}

interface IProps {
  taskName?: string;
  taskComment?: string | null;
  taskPriorityId?: string | null;
  taskDeadline?: string;
  title: string;
  buttonText: string;
  onSubmitForm: (data: Omit<ITask, "_id" | "column_id">) => void;
}

export const TaskForm: React.FC<IProps> = ({
  taskName,
  taskComment,
  taskDeadline,
  taskPriorityId,
  title,
  buttonText,
  onSubmitForm,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: taskName ?? "",
      comment: taskComment ?? "",
      priority_id: taskPriorityId ?? "",
      deadline: taskDeadline ? new Date(taskDeadline) : new Date(),
    },
    resolver: yupResolver(taskSchema),
  });

  const taskPriorities = useAppSelector(selectTaskPriorities);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    onSubmitForm({
      comment: data.comment || null,
      deadline: convertToUtcDateString(data.deadline),
      name: data.name,
      priority_id: data.priority_id || null,
    });
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

      <DescriptionInput
        style={{ marginTop: 14, padding: 0, lineHeight: 1.29 }}
        type="text"
        placeholder="Description"
        error={!!errors.comment}
        multiline
        rows={7}
        {...register("comment")}
      />
      {errors.comment && (
        <FormHelperText error>{errors.comment.message}</FormHelperText>
      )}

      <StyledInputLabel style={{ marginTop: 24 }}>Label color</StyledInputLabel>
      <Controller
        control={control}
        name="priority_id"
        render={({ field: { value, onChange } }) => (
          <StyledRadioGroup value={value} onChange={onChange}>
            {[...taskPriorities]
              .sort((a, b) => b.quantity - a.quantity)
              .map(({ _id, color }) => (
                <RadioBtn
                  key={_id}
                  value={_id}
                  icon={<RadioBtnIcon bgColor={color} />}
                  checkedIcon={<CheckedRadioBtnIcon color={color} />}
                />
              ))}
            <RadioBtn
              value={""}
              icon={
                <RadioBtnIcon
                  sx={(theme) => ({
                    backgroundColor: theme.palette.text.primary,
                    opacity: 0.3,
                  })}
                />
              }
              checkedIcon={
                <CheckedRadioBtnIcon
                  sx={(theme) => ({
                    color: theme.palette.text.primary,
                    opacity: 0.3,
                  })}
                />
              }
            />
          </StyledRadioGroup>
        )}
      />
      {errors.priority_id && (
        <FormHelperText error>{errors.priority_id.message}</FormHelperText>
      )}

      <StyledInputLabel style={{ marginTop: 14 }}>Deadline</StyledInputLabel>
      <Controller
        control={control}
        name="deadline"
        render={({ field: { onChange, value } }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            error={!!errors.deadline}
            minDate={new Date()}
          />
        )}
      />
      {errors.deadline && (
        <FormHelperText error>{errors.deadline.message}</FormHelperText>
      )}

      <ButtonWithIcon style={{ marginTop: 40 }} type="submit">
        {buttonText}
      </ButtonWithIcon>
    </form>
  );
};
