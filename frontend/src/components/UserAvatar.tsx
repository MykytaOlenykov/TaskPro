import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch, useAppSelector } from "hooks";
import { changeUserAvatar } from "store/auth/operations";
import { selectUserAvatarUrl } from "store/auth/selectors";

import avatarPlaceholder from "assets/images/avatar-placeholder.svg";

const VITE_API_STATIC_URL = import.meta.env.VITE_API_STATIC_URL;

const Container = styled("div")<{ hidePlaceholder: boolean }>(
  ({ theme, hidePlaceholder }) => ({
    position: "relative",
    display: "flex",
    margin: "0 auto 24px",
    width: 68,
    height: 68,
    fontFamily: "inherit",
    borderRadius: 8,
    backgroundColor: theme.palette.background.default,
    backgroundImage: hidePlaceholder ? "none" : `url(${avatarPlaceholder})`,
    backgroundSize: "100% 48px",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
  })
);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AvatarThumb = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  borderRadius: 8,
  overflow: "hidden",
});

const Avatar = styled("img")({
  display: "block",
  height: "100%",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

const isFileTypeValid = (fileType: string) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  return validTypes.includes(fileType);
};

export const UserAvatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const userNameAvatarUrl = useAppSelector(selectUserAvatarUrl);

  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      if (selectedFile && isFileTypeValid(selectedFile.type)) {
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        await dispatch(changeUserAvatar(formData));
      } else {
        toast.error("Invalid file type. Allowed types: JPEG, PNG, JPG.");
      }
    }
    setLoading(false);
  };

  return (
    <Container hidePlaceholder={!!userNameAvatarUrl}>
      <AvatarThumb>
        <Avatar
          alt="user avatar"
          src={
            userNameAvatarUrl
              ? VITE_API_STATIC_URL + userNameAvatarUrl
              : undefined
          }
        />
      </AvatarThumb>
      <Button
        sx={(theme) => ({
          position: "absolute",
          left: "50%",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          width: "24px",
          height: "24px",
          minWidth: 0,
          backgroundColor: theme.palette.background.sideBarButton,
          transform: "translate(-50%, 50%)",
          borderRadius: "6px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: theme.palette.background.sideBarButton,
          },
        })}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        <AddIcon style={{ width: "16px", height: "16px" }} />
        <VisuallyHiddenInput
          disabled={loading}
          accept=".jpg,.jpeg,.png"
          type="file"
          onChange={handleFileChange}
        />
      </Button>
    </Container>
  );
};
