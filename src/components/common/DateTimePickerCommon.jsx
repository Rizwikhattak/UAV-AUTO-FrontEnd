"use client";

import * as React from "react";
import { useController, useWatch } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock as ClockIcon } from "lucide-react";

export function DateTimePickerCommon({
  control,
  dateName = "start_date",
  timeName = "start_time",
  className,
}) {
  // 1) Hook up to both fields via useController
  const {
    field: dateField,
    fieldState: { error: dateError },
  } = useController({ name: dateName, control });

  const {
    field: timeField,
    fieldState: { error: timeError },
  } = useController({ name: timeName, control });

  // 2) Parse initial field values if they exist
  const initialDate = React.useMemo(() => {
    // dateField.value might be "2023-08-15"
    // try to parse it into a JS Date
    if (!dateField.value) return null;
    try {
      return new Date(dateField.value);
    } catch (err) {
      return null;
    }
  }, [dateField.value]);

  const initialTime = React.useMemo(() => {
    // timeField.value might be "14:30"
    // split into hour/minute
    if (!timeField.value) return { hour: "", minute: "" };
    const [h, m] = timeField.value.split(":");
    return { hour: h || "", minute: m || "" };
  }, [timeField.value]);

  // Local states for UI
  const [date, setDate] = React.useState(initialDate);
  const [time, setTime] = React.useState(initialTime);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  // 3) Format the combined user selection for the button text
  const formattedDateTime = React.useMemo(() => {
    // If no date yet, show placeholder
    if (!date) return "Pick date & time";

    const dayString = format(date, "PPP"); // e.g. Aug 15, 2023
    const hour = time.hour || "00";
    const minute = time.minute || "00";
    const timeString = `${hour}:${minute}`;
    return `${dayString} at ${timeString}`;
  }, [date, time]);
  // Watch the raw field value
  const fieldValue = useWatch({ control });

  // If the parent form resets this field to "", also reset local states
  React.useEffect(() => {
    if (!fieldValue) {
      setDate(null);
      setTime({ hour: "", minute: "" });
    }
  }, [fieldValue]);
  // 4) Handle time changes from the <Select> components
  const handleTimeChange = (type, value) => {
    setTime((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // 5) "Confirm" button updates both fields (date, time) in RHF
  const handleConfirm = () => {
    // If a date is selected, store it in "YYYY-MM-DD" (or your preferred format)
    if (date) {
      dateField.onChange(format(date, "yyyy-MM-dd"));
    }
    // If time is chosen, store e.g. "HH:mm"
    if (time.hour !== "" && time.minute !== "") {
      timeField.onChange(`${time.hour}:${time.minute}`);
    }

    setIsPopoverOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Date Field Label */}
      <div className="mb-1 flex items-center gap-1 text-sm font-medium text-foreground">
        <CalendarIcon className="w-4 h-4" />
        <span>Start Date & Time</span>
      </div>

      {/* Popover for selecting date/time */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDateTime}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 h-[15rem] overflow-y-auto"
          align="start"
        >
          {/* Calendar for date */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />

          {/* Time selection */}
          <div className="p-3 border-t border-border w-full">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="flex items-center justify-between mt-2 w-full">
              <Select
                value={time.hour}
                onValueChange={(val) => handleTimeChange("hour", val)}
              >
                <SelectTrigger className="w-[48%]">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hr = String(i).padStart(2, "0");
                    return (
                      <SelectItem key={hr} value={hr}>
                        {hr}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <span className="text-center text-muted-foreground">:</span>
              <Select
                value={time.minute}
                onValueChange={(val) => handleTimeChange("minute", val)}
              >
                <SelectTrigger className="w-[48%]">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 60 }, (_, i) => {
                    const min = String(i).padStart(2, "0");
                    return (
                      <SelectItem key={min} value={min}>
                        {min}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full mt-3"
              variant="hover-blue-full"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Field errors (if Zod or RHF triggers them) */}
      {dateError && (
        <p className="text-sm text-red-500 mt-1">{dateError.message}</p>
      )}
      {timeError && (
        <p className="text-sm text-red-500 mt-1">{timeError.message}</p>
      )}
    </div>
  );
}
