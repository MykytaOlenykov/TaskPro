import React, { useState } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  Box,
  styled,
  ButtonBase,
  FormHelperText,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { useAppDispatch, useAppSelector } from "hooks";
import { helpSchema } from "utils";

import { Modal } from "ui/Modal";
import { LoadingButton } from "ui/LoadingButton";
import { BaseInput } from "ui/BaseInput";
import { FormTitle } from "ui/FormTitle";

import decorativeIcon from "assets/images/decorative-icon.png";
import { selectUserEmail } from "store/auth/selectors";
import { sendHelpEmail } from "store/auth/operations";

const Container = styled(Box)(({ theme }) => ({
  padding: 14,
  borderRadius: 8,
  backgroundColor: theme.palette.background.secondarySideBar,
  [theme.breakpoints.up("md")]: {
    padding: 20,
  },
}));

const Icon = styled("div")(() => ({
  width: 54,
  height: 78,
  marginBottom: 14,
  backgroundImage: `url(${decorativeIcon})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
}));

const Text = styled(Typography)(({ theme }) => ({
  marginBottom: 18,
  paddingRight: 4,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.33,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primarySideBar,
  [theme.breakpoints.up("md")]: {
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: "-0.02em",
  },
}));

const AccentText = styled(Text)(({ theme }) => ({
  display: "inline-block",
  marginBottom: 0,
  padding: 0,
  color: theme.palette.text.primaryAccent,
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  display: "flex",
  fontFamily: "inherit",
  fontWeight: 500,
  fontSize: 12,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primarySideBar,
  borderRadius: 8,
}));

const HelpIcon = styled(HelpOutlineOutlinedIcon)(() => ({
  marginRight: 8,
  width: 20,
  height: 20,
}));

interface IFormData {
  email: string;
  comment: string;
}

const defaultValues: IFormData = {
  email: "",
  comment: "",
};

const HelpForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(selectUserEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: { ...defaultValues, email: userEmail ?? "" },
    resolver: yupResolver(helpSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    const result = await dispatch(sendHelpEmail(data));
    setLoading(false);
    if (isFulfilled(result)) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Need help</FormTitle>

      <BaseInput
        type="email"
        placeholder="Email address"
        error={!!errors.email}
        {...register("email")}
      />
      {errors.email && (
        <FormHelperText error>{errors.email.message}</FormHelperText>
      )}
      <BaseInput
        style={{ marginTop: 14, padding: 0 }}
        type="text"
        placeholder="Comment"
        error={!!errors.comment}
        multiline
        rows={5}
        {...register("comment")}
      />
      {errors.comment && (
        <FormHelperText error>{errors.comment.message}</FormHelperText>
      )}
      <LoadingButton style={{ marginTop: 24 }} type="submit" loading={loading}>
        Send
      </LoadingButton>
    </form>
  );
};

export const Help: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Icon />
      <Text variant="body1">
        If you need help with <AccentText variant="body2">TaskPro</AccentText>,
        check out our support resources or reach out to our customer support
        team.
      </Text>
      <Button type="button" onClick={() => setOpen(true)}>
        <HelpIcon />
        Need help?
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <HelpForm onClose={() => setOpen(false)} />
      </Modal>
    </Container>
  );
};
