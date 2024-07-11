import { LinearProgress, styled } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectLoading } from "store/boards/selectors";

const Loader = styled(LinearProgress)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  backgroundColor: theme.palette.background.secondaryLoader,
  ".MuiLinearProgress-bar": {
    backgroundColor: theme.palette.background.primaryLoader,
  },
}));

export const BoardLoader = () => {
  const loading = useAppSelector(selectLoading);

  return loading ? <Loader /> : null;
};
