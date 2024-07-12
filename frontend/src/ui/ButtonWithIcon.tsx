import React from "react";
import { ButtonProps, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BaseButton } from "./BaseButton";

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

export const ButtonWithIcon: React.FC<ButtonProps> = ({
  children,
  style,
  ...otherProps
}) => {
  return (
    <BaseButton
      style={{ gap: 8, paddingTop: 10, paddingBottom: 11, ...style }}
      {...otherProps}
    >
      <AddIconContainer>
        <AddIcon style={{ width: 16, height: 16 }} />
      </AddIconContainer>
      {children}
    </BaseButton>
  );
};
