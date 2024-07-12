import React from "react";
import {
  Box,
  IconButton,
  ModalProps,
  Modal as MuiModal,
  styled,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const StyledModal = styled(MuiModal)(({ theme }) => ({
  ".MuiBackdrop-root": {
    backgroundColor: theme.palette.background.backdrop,
  },
}));

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: 23,
  maxWidth: 335,
  width: "100%",
  backgroundColor: theme.palette.background.primaryBox,
  borderRadius: 8,
  transform: "translate(-50%, -50%)",
  outline: "none",
  border: `1px solid ${
    theme.palette.border?.modal ?? theme.palette.background.primaryBox
  }`,
  [theme.breakpoints.up("md")]: {
    maxWidth: 350,
  },
}));

const Button = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 6,
  right: 6,
  color: theme.palette.text.primary,
}));

interface IProps extends ModalProps {
  onClose: (reason: "backdropClick" | "escapeKeyDown" | "button") => void;
}

export const Modal: React.FC<IProps> = ({
  onClose,
  children,
  ...otherProps
}) => {
  return (
    <StyledModal onClose={(_, reason) => onClose(reason)} {...otherProps}>
      <Container>
        <Button type="button" onClick={() => onClose("button")}>
          <CloseRoundedIcon style={{ width: 18, height: 18 }} />
        </Button>
        {children}
      </Container>
    </StyledModal>
  );
};
