import React from "react";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import {
  usePickerLayout,
  PickersLayoutRoot,
  pickersLayoutClasses,
  PickersLayoutContentWrapper,
  PickersLayoutProps,
} from "@mui/x-date-pickers/PickersLayout";
import { addMonths, format } from "date-fns";
import { Locale } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1,
  },
};

const StyledDatePicker = styled(MuiDatePicker)(({ theme }) => ({
  ".MuiInputBase-root": {
    width: "100%",
    borderRadius: 8,
    boxShadow: "0 4px 16px 0 rgba(22, 22, 22, 0.08)",
    opacity: 0.4,
    backgroundColor: theme.palette.background.primaryInput,
    ".MuiOutlinedInput-input": {
      padding: "14px 18px",
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: "-0.02em",
      "::placeholder": {
        color: theme.palette.text.primary,
        opacity: 1,
      },
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.border?.input,
    },
    "&.Mui-focused": {
      opacity: 1,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
      borderColor: theme.palette.border?.input,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.border?.input,
    },
  },
}));

const StyledPickersLayoutRoot = styled(PickersLayoutRoot)(({ theme }) => ({
  backgroundColor: theme.palette.background.popup,
  backgroundImage: "none",
  borderRadius: 8,
  border: `1px solid ${theme.palette.text.primaryAccent}`,
  boxShadow: "none",

  ".MuiDateCalendar-root": {
    width: 233,
    height: "min-content",
  },

  ".MuiDayCalendar-header": {
    justifyContent: "space-between",
    padding: "0 18px",
    marginBottom: 11,
  },

  ".MuiTypography-root.MuiDayCalendar-weekDayLabel": {
    margin: 0,
    width: 24,
    height: "min-content",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: "-0.02em",
    textAlign: "center",
    color: theme.palette.text.primaryDatepicker,
  },

  ".MuiDayCalendar-monthContainer": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,
    padding: "0 18px 18px",
  },

  ".MuiPickersSlideTransition-root": {
    minHeight: 181,
  },

  ".MuiDayCalendar-weekContainer": {
    justifyContent: "space-between",
    margin: 0,
  },

  ".MuiPickersDay-root": {
    margin: "0",
    width: 24,
    height: 24,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.29,
    letterSpacing: "-0.02em",
    textAlign: "center",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.text.primaryAccent,
    },
    "&.Mui-selected": {
      color: theme.palette.text.selectedDatepicker,
      backgroundColor: theme.palette.text.primaryAccent,
      "&:hover, &:focus": {
        color: theme.palette.text.selectedDatepicker,
        backgroundColor: theme.palette.text.primaryAccent,
      },
    },
    "&.Mui-disabled": {
      color: theme.palette.text.secondaryDatepicker,
    },
  },

  ".MuiPickersDay-dayOutsideMonth": {
    color: theme.palette.text.secondaryDatepicker,
    "&:hover": {
      color: theme.palette.text.secondaryDatepicker,
    },
  },
}));

const CustomCalendarHeaderRoot = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 10px 28px",
  "&::after": {
    content: "''",
    position: "absolute",
    left: 18,
    bottom: 13.5,
    width: 197,
    height: 1,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.2,
  },
}));

const DateLabel = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 500,
  fontSize: 16,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const CustomCalendarHeader: React.FC<PickersCalendarHeaderProps<Date>> = (
  props
) => {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () =>
    onMonthChange(addMonths(currentMonth, 1), "left");
  const selectPreviousMonth = () =>
    onMonthChange(addMonths(currentMonth, -1), "right");

  return (
    <CustomCalendarHeaderRoot>
      <IconButton
        style={{ padding: 0 }}
        onClick={selectPreviousMonth}
        title="Previous month"
      >
        <ChevronLeft />
      </IconButton>
      <DateLabel variant="body2">{format(currentMonth, "MMMM yyyy")}</DateLabel>
      <IconButton
        style={{ padding: 0 }}
        onClick={selectNextMonth}
        title="Next month"
      >
        <ChevronRight />
      </IconButton>
    </CustomCalendarHeaderRoot>
  );
};

const DatePickerCustomLayout: React.FC<PickersLayoutProps<any, any, any>> = (
  props
) => {
  const { tabs, content } = usePickerLayout(props);

  return (
    <StyledPickersLayoutRoot
      className={pickersLayoutClasses.root}
      ownerState={props}
    >
      <PickersLayoutContentWrapper
        className={pickersLayoutClasses.contentWrapper}
      >
        {tabs}
        {content}
      </PickersLayoutContentWrapper>
    </StyledPickersLayoutRoot>
  );
};

interface IProps extends DatePickerProps<Date, any> {
  error: boolean;
}

export const DatePicker: React.FC<IProps> = ({ error, ...otherProps }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={customEnLocale}
    >
      <DemoContainer sx={{ padding: 0 }} components={["DatePicker"]}>
        <StyledDatePicker
          {...otherProps}
          showDaysOutsideCurrentMonth
          format="dd.MM.yyyy"
          dayOfWeekFormatter={(weekday) => format(weekday, "EEEEEE")}
          slots={{
            calendarHeader: CustomCalendarHeader,
            layout: DatePickerCustomLayout,
          }}
          slotProps={{
            textField: {
              placeholder: "DD.MM.YYYY",
              error,
            },
            desktopPaper: {
              sx: {
                boxShadow: "none",
                marginY: "16px",
                backgroundColor: "transparent",
              },
            },
            mobilePaper: {
              sx: {
                boxShadow: "none",
                minWidth: "0 !important",
                backgroundColor: "transparent",
              },
            },
            toolbar: { hidden: true },
            actionBar: { hidden: true },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
