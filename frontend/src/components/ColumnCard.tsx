import React, { useState } from "react";
import { IconButton, styled, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface IProps {
  columnId: string;
  columnName: string;
}

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 14,
  width: "100%",
}));

const ColumnTitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px 20px",
  minHeight: 56,
  backgroundColor: theme.palette.background.task,
  borderRadius: 8,
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  marginRight: "auto",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
}));

const Button = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.icon?.task,
  "&:hover": {
    color: theme.palette.text.primaryAccent,
  },
}));

export const ColumnCard: React.FC<IProps> = ({ columnId, columnName }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = (
    reason: "backdropClick" | "escapeKeyDown" | "button"
  ) => {
    if (reason === "backdropClick") return;
    setOpenEdit(false);
  };

  const handleEditColumn = () => {};

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteColumn = async () => {};

  return (
    <Container>
      <ColumnTitleContainer>
        <ColumnTitle>{columnName}</ColumnTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
            gap: 8,
          }}
        >
          <Button onClick={handleOpenEdit}>
            <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
          </Button>
          <Button onClick={handleOpenDelete}>
            <DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />
          </Button>
        </div>
      </ColumnTitleContainer>
    </Container>
  );
};
