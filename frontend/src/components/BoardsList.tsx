import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  List,
  IconButton,
  styled,
  Typography,
  ListItem,
  ListItemButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppSelector } from "hooks";
import { selectBoards } from "store/board/selectors";
import { selectIcons } from "store/static/selectors";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  margin: 0,
  padding: 0,
  overflowY: "auto",
  scrollbarColor: `${theme.palette.background.default} ${theme.palette.background.primarySideBar}`,
  scrollbarWidth: "thin",
}));

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

export const BoardsList: React.FC = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));

  const boards = useAppSelector(selectBoards);
  const icons = useAppSelector(selectIcons);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const minHeight = 61 * 3 + 4 * 2;

  const mobileMaxHeight = windowHeight - 600;
  const tabletMaxHeight = windowHeight - 652;
  const maxHeight = isTablet ? tabletMaxHeight : mobileMaxHeight;

  useEffect(() => {
    const updateMaxHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateMaxHeight);

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);

  return (
    <div
      style={{
        padding: "40px 0",
      }}
    >
      <StyledList
        style={{
          maxHeight: maxHeight < minHeight ? minHeight : maxHeight,
          minHeight,
        }}
      >
        {boards.map(({ _id, icon_id, name }) => {
          const selected = boardId === _id;

          return (
            <ListItem key={_id} disablePadding>
              <StyledListItemButton
                selected={selected}
                onClick={() => !selected && navigate(`/home/${_id}`)}
              >
                <Icon
                  url={icons.find(({ _id }) => _id === icon_id)?.url ?? ""}
                  selected={selected}
                />
                <BoardName selected={selected} variant="body2">
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
                    <Button style={{ marginRight: 4 }}>
                      <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
                    </Button>
                    <Button>
                      <DeleteOutlineOutlinedIcon
                        sx={{ width: 20, height: 20 }}
                      />
                    </Button>
                  </div>
                )}
              </StyledListItemButton>
            </ListItem>
          );
        })}
      </StyledList>
    </div>
  );
};
