import React, { useState } from "react";
import { ButtonBase, Menu, styled, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectTaskPriorities, selectTasksFilter } from "store/tasks/selectors";
import { changeFilter } from "store/tasks/slice";

import CheckedFilterSvg from "assets/images/checked-radio-btn.svg?react";

const Button = styled(ButtonBase)(({ theme }) => ({
  alignItems: "center",
  gap: 4,
  marginLeft: "auto",
  fontFamily: "inherit",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.428,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
  opacity: 0.8,
  borderRadius: 8,
}));

const Icon = styled(FilterAltOutlinedIcon)(() => ({
  width: 20,
  height: 20,
  strokeWidth: "1.5px",
}));

const FilterMenu = styled(Menu)(({ theme }) => ({
  marginTop: 48,
  ".MuiPaper-root": {
    backgroundImage: "none",
    backgroundColor: theme.palette.background.primaryBox,
    borderRadius: 8,
    boxShadow: "0 4px 16px 0 rgba(17, 17, 17, 0.1)",
  },
  ".MuiList-root": {
    display: "flex",
    flexDirection: "column",
    padding: 24,
    minWidth: 300,
  },
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  fontWeight: 500,
  fontSize: 18,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
  "&::after": {
    content: "''",
    position: "absolute",
    left: 0,
    bottom: -13.5,
    width: "100%",
    height: 1,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.1,
  },
}));

const FilterSubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
}));

const ShowAllButton = styled(ButtonBase)(({ theme }) => ({
  fontFamily: "inherit",
  fontWeight: 400,
  fontSize: 12,
  letterSpacing: "-0.02em",
  textDecoration: "underline",
  lineHeight: 1.5,
  color: theme.palette.text.primary,
  opacity: 0.5,
  borderRadius: 8,
}));

const FilterList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 0,
  listStyle: "none",
});

const FilterListItem = styled("li")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
});

const FilterLabel = styled(Typography)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    fontSize: 14,
    letterSpacing: "-0.02em",
    color: theme.palette.text.primary,
    opacity: selected ? 1 : 0.5,
    "li:hover > &": {
      color: selected
        ? theme.palette.text.primary
        : theme.palette.text.primaryAccent,
      opacity: 1,
    },
  })
);

const CheckedFilterIcon = styled(CheckedFilterSvg)<{ color?: string }>(
  ({ color, theme }) => ({
    width: 16,
    height: 16,
    color: color ? color : theme.palette.text.primary,
    opacity: color ? 1 : 0.3,
  })
);

const FilterIcon = styled("div")<{ bgColor?: string }>(
  ({ bgColor, theme }) => ({
    width: 16,
    height: 16,
    backgroundColor: bgColor ? bgColor : theme.palette.text.primary,
    borderRadius: "100%",
    opacity: bgColor ? 1 : 0.3,
  })
);

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskPriorities = useAppSelector(selectTaskPriorities);
  const tasksFilter = useAppSelector(selectTasksFilter);

  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(
    null
  );

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorElFilter(null);
  };

  const handleChangeFilter = (_id: "without" | string | null) => {
    dispatch(changeFilter(_id));
    handleCloseFilterMenu();
  };

  return (
    <>
      <Button type="button" onClick={handleOpenFilterMenu}>
        <Icon />
        Filters
      </Button>
      <FilterMenu
        id="filter-menu"
        anchorEl={anchorElFilter}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElFilter)}
        onClose={handleCloseFilterMenu}
      >
        <li style={{ marginBottom: 28 }}>
          <FilterTitle>Filters</FilterTitle>
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <FilterSubTitle>Label color</FilterSubTitle>
          <ShowAllButton onClick={() => handleChangeFilter(null)}>
            Show all
          </ShowAllButton>
        </li>
        <li>
          <FilterList>
            <FilterListItem onClick={() => handleChangeFilter("without")}>
              {"without" === tasksFilter ? (
                <CheckedFilterIcon />
              ) : (
                <FilterIcon />
              )}
              <FilterLabel selected={"without" === tasksFilter}>
                Without priority
              </FilterLabel>
            </FilterListItem>
            {[...taskPriorities]
              .sort((a, b) => b.quantity - a.quantity)
              .map(({ _id, name, color }) => (
                <FilterListItem
                  key={_id}
                  onClick={() => handleChangeFilter(_id)}
                >
                  {_id === tasksFilter ? (
                    <CheckedFilterIcon color={color} />
                  ) : (
                    <FilterIcon bgColor={color} />
                  )}
                  <FilterLabel selected={_id === tasksFilter}>
                    {name}
                  </FilterLabel>
                </FilterListItem>
              ))}
          </FilterList>
        </li>
      </FilterMenu>
    </>
  );
};
