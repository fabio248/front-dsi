import React from "react";

import { Vet_components } from "../../components";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import "./Vet_Layouts.css";

export function Vet_Layouts(props) {
  const { children } = props;
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DemoItem label="Uncontrolled calendar">
            <DateCalendar defaultValue={dayjs("2022-04-17")} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeClock />
      </LocalizationProvider>
      <Vet_components />
      {children}
    </>
  );
}
