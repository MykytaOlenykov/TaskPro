import React from "react";
import { List, ListItem, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BaseButton } from "ui/BaseButton";

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  gap: 34,
  margin: 0,
  padding: 0,
  overflowX: "auto",
  scrollbarColor: `${theme.palette.background.default} ${theme.palette.background.primarySideBar}`,
  scrollbarWidth: "thin",
}));

const StyledListItem = styled(ListItem)(() => ({
  maxWidth: 335,
}));

const Button = styled(BaseButton)(({ theme }) => ({
  gap: 8,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.secondaryButton,
  "&:hover": {
    backgroundColor: theme.palette.background.secondaryButtonHover,
  },
}));

const AddIconContainer = styled("span")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 28,
  height: 28,
  color: theme.palette.background.secondaryButton,
  backgroundColor: theme.palette.background.secondaryAdd,
  borderRadius: 6,
}));

export const ColumnsList: React.FC = () => {
  return (
    <StyledList>
      <StyledListItem disablePadding>
        <Button>
          <AddIconContainer>
            <AddIcon style={{ width: 16, height: 16 }} />
          </AddIconContainer>
          Add another column
        </Button>
      </StyledListItem>
    </StyledList>
  );
};
