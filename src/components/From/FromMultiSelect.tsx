import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { getTimeIn12HourFormat } from "../Utils/UtilsFun/getTimeIn12HourFormat";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, schedules: readonly string[], theme: Theme) {
  return {
    fontWeight:
      schedules.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FromMultiSelect = ({
  schedules,
  selectScheduleIds,
  setSelectScheduleIds,
}: any) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectScheduleIds>) => {
    const {
      target: { value },
    } = event;
    setSelectScheduleIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl fullWidth={true}>
      <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectScheduleIds}
        onChange={handleChange}
        input={
          <OutlinedInput id="select-multiple-chip" label="Create Schedule" />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => {
              const selectedSchedule = schedules.find(
                (schedule: any) => schedule.id === value
              );

              if (!selectedSchedule) return null;

              const formattedTimeSlot = `${getTimeIn12HourFormat(
                selectedSchedule.startDate
              )} - ${getTimeIn12HourFormat(selectedSchedule.endDate)}`;

              return <Chip key={value} label={formattedTimeSlot} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {schedules.map((schedule: any) => (
          <MenuItem
            key={schedule.id}
            value={schedule.id}
            style={getStyles(schedule.id, schedules, theme)}
          >
            {`${getTimeIn12HourFormat(
              schedule.startDate
            )} - ${getTimeIn12HourFormat(schedule.endDate)}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FromMultiSelect;
