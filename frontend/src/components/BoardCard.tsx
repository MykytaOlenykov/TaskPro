import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";
import { IconButton, styled, Typography, ListItemButton } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectIcons } from "store/static/selectors";
import { deleteBoard, editBoard } from "store/board/operations";

import { Modal } from "ui/Modal";
import { BoardForm } from "./BoardForm";
import { DeleteModal } from "./DeleteModal";

import type { IBoard } from "types";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "20px 18px 20px 14px",
  backgroundColor: "transparent",
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: theme.palette.background.primarySelectedBoard,
  },
  "&.Mui-selected::after": {
    content: "''",
    position: "absolute",
    right: 0,
    top: 0,
    width: 4,
    height: "100%",
    backgroundColor: theme.palette.background.secondarySelectedBoard,
    borderRadius: "4px 0 0 4px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "20px 24px",
  },
}));

const Icon = styled("span")<{ url: string; selected: boolean }>(
  ({ url, selected, theme }) => ({
    flexShrink: 0,
    display: "block",
    marginRight: 4,
    width: 18,
    height: 18,
    backgroundColor: selected
      ? theme.palette.text.primarySideBar
      : theme.palette.text.secondarySideBar,
    maskImage: `url(${VITE_API_URL + url})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
  })
);

const BoardName = styled(Typography)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    marginRight: "auto",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: "-0.02em",
    lineHeight: 1.5,
    color: selected
      ? theme.palette.text.primarySideBar
      : theme.palette.text.secondarySideBar,
  })
);

const Button = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.text.secondarySideBar,
  "&:hover": {
    color: theme.palette.text.primaryAccent,
  },
}));

interface IProps {
  _id: string;
  name: string;
  selected: boolean;
  iconId: string;
  backgroundId: string | null;
}

export const BoardCard: React.FC<IProps> = ({
  _id,
  name,
  iconId,
  backgroundId,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const icons = useAppSelector(selectIcons);
  const iconUrl = icons.find(({ _id }) => _id === iconId)?.url;

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

  const handleEditBoard = (data: Omit<IBoard, "_id">) => {
    dispatch(editBoard({ ...data, _id }));
    setOpenEdit(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteBoard = async () => {
    const result = await dispatch(deleteBoard(_id));
    if (isFulfilled(result)) {
      setOpenDelete(false);
      navigate("/home");
    }
  };

  return (
    <>
      <StyledListItemButton
        selected={selected}
        onClick={() => !selected && navigate(`/home/${_id}`)}
      >
        {iconUrl && <Icon url={iconUrl} selected={selected} />}
        <BoardName selected={selected} variant="body2" noWrap>
          {name}
        </BoardName>

        {selected && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "16px",
            }}
          >
            <Button style={{ marginRight: 4 }} onClick={handleOpenEdit}>
              <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
            </Button>
            <Button onClick={handleOpenDelete}>
              <DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />
            </Button>
          </div>
        )}
      </StyledListItemButton>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <BoardForm
          boardName={name}
          boardIconId={iconId}
          boardBackgroundId={backgroundId}
          title="Edit board"
          buttonText="Edit"
          onSubmitForm={handleEditBoard}
        />
      </Modal>
      <DeleteModal
        text={`Are you sure you want to delete the board "${name}"? Its columns and tasks will also be deleted.`}
        open={openDelete}
        onClose={handleCloseDelete}
        onDelete={handleDeleteBoard}
      />
    </>
  );
};
