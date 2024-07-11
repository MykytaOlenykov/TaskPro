import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Radio,
  RadioGroup,
  styled,
  Typography,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppSelector } from "hooks";
import { boardSchema } from "utils";
import { selectBackgrounds, selectIcons } from "store/static/selectors";

import { BaseInput } from "ui/BaseInput";
import { InputLabel } from "ui/InputLabel";
import { BaseButton } from "ui/BaseButton";

import type { IBoard } from "types";

import BackgroundPlaceholderIcon from "assets/images/background-placeholder.svg?react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: 24,
  fontWeight: 500,
  fontSize: 18,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
}));

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

const IconsList = styled(RadioGroup)({
  flexDirection: "row",
  gap: 8,
});

const Icon = styled("span")<{ url: string; checked?: boolean }>(
  ({ url, theme, checked }) => ({
    display: "block",
    width: 18,
    height: 18,
    backgroundColor: checked
      ? theme.palette.text.primary
      : theme.palette.icon?.primary,
    maskImage: `url(${VITE_API_URL + url})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
  })
);

const BackgroundsList = styled(RadioGroup)({
  display: "grid",
  gridTemplateColumns: "repeat(8, 28px)",
  gap: 4,
  marginBottom: 40,
});

const Background = styled("span")<{ url: string; checked?: boolean }>(
  ({ url, checked, theme }) => ({
    display: "block",
    width: 28,
    height: 28,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
    backgroundImage: `url(${VITE_API_URL + url})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    transform: checked ? "scale(1.15)" : "scale(1)",
    transition: "transform 0.3s ease-in-out",
  })
);

const BackgroundPlaceholderContainer = styled("span")<{
  checked?: boolean;
}>(({ checked, theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.default,
  borderRadius: 6,
  overflow: "hidden",
  transform: checked ? "scale(1.15)" : "scale(1)",
  transition: "transform 0.3s ease-in-out",
}));

const BackgroundPlaceholder: React.FC<{
  checked?: boolean;
}> = ({ checked }) => (
  <BackgroundPlaceholderContainer checked={checked}>
    <BackgroundPlaceholderIcon
      style={{
        display: "block",
        width: 16,
        height: 16,
        stroke: "currentcolor",
      }}
    />
  </BackgroundPlaceholderContainer>
);

const AddIconContainer = styled("span")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 28,
  height: 28,
  color: theme.palette.icon?.primaryAdd,
  backgroundColor: theme.palette.background.primaryAdd,
  borderRadius: 6,
}));

interface IForm {
  name: string;
  icon_id: string;
  background_id?: string | null;
}

interface IProps {
  boardName?: string;
  boardIconId?: string;
  boardBackgroundId?: string | null;
  title: string;
  buttonText: string;
  onSubmitForm: (data: Omit<IBoard, "_id">) => void;
}

export const BoardForm: React.FC<IProps> = ({
  boardName,
  boardIconId,
  boardBackgroundId,
  title,
  buttonText,
  onSubmitForm,
}) => {
  const icons = useAppSelector(selectIcons);
  const backgrounds = useAppSelector(selectBackgrounds);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: boardName,
      icon_id: boardIconId,
      background_id: boardBackgroundId ?? "",
    },
    resolver: yupResolver(boardSchema),
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    onSubmitForm({ ...data, background_id: data.background_id || null });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Title variant="body1">{title}</Title>

      <BaseInput
        type="text"
        placeholder="Title"
        error={!!errors.name}
        {...register("name")}
      />
      {errors.name && (
        <FormHelperText error>{errors.name.message}</FormHelperText>
      )}

      <InputLabel style={{ marginTop: 24, marginBottom: 14 }}>Icons</InputLabel>
      <Controller
        control={control}
        name="icon_id"
        render={({ field: { value, onChange } }) => (
          <IconsList value={value} onChange={onChange}>
            {icons.map(({ _id, url }) => (
              <RadioBtn
                key={_id}
                value={_id}
                icon={<Icon url={url} />}
                checkedIcon={<Icon url={url} checked />}
              />
            ))}
          </IconsList>
        )}
      />
      {errors.icon_id && (
        <FormHelperText error>{errors.icon_id.message}</FormHelperText>
      )}

      <InputLabel style={{ marginBottom: 14, marginTop: 24 }}>
        Background
      </InputLabel>
      <Controller
        control={control}
        name="background_id"
        render={({ field: { value, onChange } }) => (
          <BackgroundsList value={value} onChange={onChange}>
            <RadioBtn
              value=""
              icon={<BackgroundPlaceholder />}
              checkedIcon={<BackgroundPlaceholder checked />}
            />
            {backgrounds.map(({ _id, previewUrl }) => (
              <RadioBtn
                key={_id}
                value={_id}
                icon={<Background url={previewUrl} />}
                checkedIcon={<Background url={previewUrl} checked />}
              />
            ))}
          </BackgroundsList>
        )}
      />
      {errors.background_id && (
        <FormHelperText error>{errors.background_id.message}</FormHelperText>
      )}

      <BaseButton
        type="submit"
        style={{ gap: 8, paddingTop: 10, paddingBottom: 11 }}
      >
        <AddIconContainer>
          <AddIcon style={{ width: 16, height: 16 }} />
        </AddIconContainer>
        {buttonText}
      </BaseButton>
    </form>
  );
};
