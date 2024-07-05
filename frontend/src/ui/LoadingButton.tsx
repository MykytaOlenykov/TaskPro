import React from "react";
import { ButtonProps, CircularProgress, styled } from "@mui/material";

import { BaseButton } from "./BaseButton";

const ButtonProgress = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  width: "24px !important",
  height: "24px !important",
  color: theme.palette.text.primaryButton,
}));

const Button = styled(BaseButton)(() => ({
  position: "relative",
}));

interface IProps extends ButtonProps {
  loading?: boolean;
}

export const LoadingButton: React.FC<IProps> = ({
  loading,
  disabled,
  children,
  ...otherProps
}) => {
  return (
    <Button disabled={loading || disabled} {...otherProps}>
      {loading && <ButtonProgress />}
      <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
    </Button>
  );
};
