import React from "react";
import { Typography } from "@mui/material";

import { Modal } from "ui/Modal";
import { BaseButton } from "ui/BaseButton";

interface IProps {
  text?: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModal: React.FC<IProps> = ({
  text = "Are you sure you want to delete?",
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Typography
          style={{ textAlign: "center" }}
          variant="body1"
          fontWeight={500}
          fontSize={20}
          marginBottom="16px"
        >
          {text}
        </Typography>
        <BaseButton onClick={onDelete}>Yes</BaseButton>
      </>
    </Modal>
  );
};
