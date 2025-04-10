import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import type { DatePickerProps } from './datepicker.type';
import {
  formatDate,
  formatTime,
  getDaysInMonth,
  getYears,
  getHours,
  getMinutes,
  getAmPm,
  getLanguageConfig,
  getMonths,
} from './utils';
import BottomSheet from '../BottomSheet';
import WheelPickerColumn from './WheelPickerColumn';
import GradientView from './GradientView';
import { ITEM_HEIGHT, VISIBLE_ITEMS } from './constants';

const WheelDatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'เลือกวันที่',
  format = 'MMM DD, YYYY',
  disabled = false,
  color = '#0066CC',
  mode = 'date',
  language = 'th',
  use24Hour = false,
}) => {
  // Get language configuration
  const langConfig = useMemo(() => getLanguageConfig(language), [language]);

  // ======== STATE MANAGEMENT ========
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());

  // Current selected values as strings for WheelPickerColumn
  const [day, setDay] = useState(selectedDate.getDate().toString());
  // Get months based on language
  const monthsList = useMemo(() => getMonths(language), [language]);
  const [month, setMonth] = useState(monthsList[selectedDate.getMonth()]);
  const [year, setYear] = useState(selectedDate.getFullYear().toString());

  // Time values
  // For 12-hour format, convert hours accordingly
  const [hour, setHour] = useState(() => {
    let h = selectedDate.getHours();
    if (!use24Hour) {
      h = h % 12;
      h = h === 0 ? 12 : h; // Convert 0 to 12 for 12-hour format
    }
    return h.toString().padStart(2, '0');
  });

  const [minute, setMinute] = useState(() => {
    // Round to the nearest 5 minutes
    const mins = selectedDate.getMinutes();
    const roundedMins = Math.round(mins / 5) * 5;
    return (roundedMins === 60 ? 0 : roundedMins).toString().padStart(2, '0');
  });

  const [ampm, setAmPm] = useState(() => {
    return selectedDate.getHours() >= 12 ? 'PM' : 'AM';
  });

  // ======== MEMOIZED VALUES ========
  const hoursList = useMemo(() => getHours(use24Hour), [use24Hour]);
  const minutesList = useMemo(() => getMinutes(5), []); // 5-minute intervals
  const ampmList = useMemo(() => getAmPm(), []);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return getYears(
      Math.max(minDate?.getFullYear() || currentYear - 50, currentYear - 50),
      Math.min(maxDate?.getFullYear() || currentYear + 50, currentYear + 50)
    );
  }, [minDate, maxDate]);

  const days = useMemo(() => {
    // Get month index, defaulting to 0 if not found
    const safeMonth = (month || monthsList[0]) as string;
    const monthIndex = monthsList.indexOf(safeMonth);
    return getDaysInMonth(monthIndex !== -1 ? monthIndex : 0, parseInt(year));
  }, [month, year, monthsList]);

  const formattedValue = useMemo(() => {
    if (!value) return placeholder;

    if (mode === 'date') {
      return formatDate(value, format, language);
    } else if (mode === 'time') {
      return formatTime(value, use24Hour);
    } else if (mode === 'datetime') {
      return `${formatDate(value, format, language)} ${formatTime(value, use24Hour)}`;
    }

    return placeholder;
  }, [value, format, placeholder, mode, language, use24Hour]);

  const datePickerHeight = useMemo(() => {
    const pickerHeight = ITEM_HEIGHT * VISIBLE_ITEMS;
    const titleHeight = 35;
    const buttonsHeight = 15;
    const bottomPadding = 10;
    return pickerHeight + titleHeight + buttonsHeight + bottomPadding;
  }, []);

  // ======== DATE MANAGEMENT FUNCTIONS ========
  const updateDateValues = useCallback(
    (newDate: Date) => {
      // Ensure it's a valid date before updating
      if (!isNaN(newDate.getTime())) {
        setDay(newDate.getDate().toString());
        setMonth(monthsList[newDate.getMonth()]);
        setYear(newDate.getFullYear().toString());

        // Update hour based on 12/24 hour format
        let h = newDate.getHours();
        if (!use24Hour) {
          h = h % 12;
          h = h === 0 ? 12 : h; // Convert 0 to 12 for 12-hour format
        }
        setHour(h.toString().padStart(2, '0'));

        // Round minutes to nearest 5
        const mins = newDate.getMinutes();
        const roundedMins = Math.round(mins / 5) * 5;
        setMinute(
          (roundedMins === 60 ? 0 : roundedMins).toString().padStart(2, '0')
        );

        // Set AM/PM
        setAmPm(newDate.getHours() >= 12 ? 'PM' : 'AM');

        setTempDate(new Date(newDate)); // Create a new Date object to avoid reference issues
      }
    },
    [monthsList, use24Hour]
  );

  // ======== CALLBACKS ========
  const openPicker = useCallback(() => {
    if (!disabled) {
      // Reset temporary date to current selected date when opening
      if (value) {
        updateDateValues(new Date(value));
      } else {
        updateDateValues(new Date());
      }
      setIsOpen(true);
    }
  }, [disabled, value, updateDateValues]);

  const closePicker = useCallback(() => setIsOpen(false), []);

  const handleConfirm = useCallback(() => {
    // Ensure month is valid
    const safeMonth = (month || monthsList[0]) as string;
    const monthIndex = monthsList.indexOf(safeMonth);

    // Properly validate all parts
    const monthNum = monthIndex !== -1 ? monthIndex : 0;
    const yearNum = parseInt(year);
    const dayNum = parseInt(day);

    // Convert hour to 24-hour format if needed
    let hourNum = parseInt(hour);
    if (!use24Hour) {
      // In 12-hour clock, convert to 24-hour
      if (ampm === 'PM' && hourNum < 12) {
        hourNum += 12;
      } else if (ampm === 'AM' && hourNum === 12) {
        hourNum = 0;
      }
    }

    const minuteNum = parseInt(minute);

    // Get proper days in selected month
    const daysInMonth = getDaysInMonth(monthNum, yearNum);

    // Ensure day doesn't exceed days in month
    const validDay = Math.min(dayNum, daysInMonth.length);

    // Create date with validated values
    const newDate = new Date(yearNum, monthNum, validDay, hourNum, minuteNum);

    // Validate date
    if (!isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
      updateDateValues(newDate); // Ensure all values are perfectly in sync
      onChange?.(newDate);
      closePicker();
    }
  }, [
    day,
    month,
    year,
    hour,
    minute,
    ampm,
    monthsList,
    onChange,
    closePicker,
    updateDateValues,
    use24Hour,
  ]);

  const handleDayChange = useCallback(
    (newDay: string) => {
      // Update day state
      setDay(newDay);

      // Create and validate new date
      updateDateWithCurrentValues(
        parseInt(newDay),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    },
    [month, year, hour, minute, ampm, monthsList]
  );

  const handleMonthChange = useCallback(
    (newMonth: string) => {
      // Update month state
      setMonth(newMonth);

      // Get the month index
      const monthIndex = monthsList.indexOf(newMonth);
      const monthNum = monthIndex !== -1 ? monthIndex : 0;

      // Check if we need to adjust the day (e.g., Feb 31st -> Feb 28th)
      const yearNum = parseInt(year);
      const daysInMonth = getDaysInMonth(monthNum, yearNum);
      let dayNum = parseInt(day);

      // If current day exceeds days in the new month, adjust it
      if (dayNum > daysInMonth.length) {
        dayNum = daysInMonth.length;
        setDay(dayNum.toString());
      }

      // Create and validate the new date
      updateDateWithCurrentValues(
        dayNum,
        monthNum,
        undefined,
        undefined,
        undefined,
        undefined
      );
    },
    [day, year, hour, minute, ampm, monthsList]
  );

  const handleYearChange = useCallback(
    (newYear: string) => {
      // Update year state
      setYear(newYear);

      // Get the month index
      const safeMonth = (month || monthsList[0]) as string;
      const monthIndex = monthsList.indexOf(safeMonth);
      const monthNum = monthIndex !== -1 ? monthIndex : 0;
      const yearNum = parseInt(newYear);

      // Check if we need to adjust the day (e.g., Feb 29 in non-leap year)
      const daysInMonth = getDaysInMonth(monthNum, yearNum);
      let dayNum = parseInt(day);

      // If current day exceeds days in month with the new year, adjust it
      if (dayNum > daysInMonth.length) {
        dayNum = daysInMonth.length;
        setDay(dayNum.toString());
      }

      // Create and validate new date
      updateDateWithCurrentValues(
        dayNum,
        monthNum,
        yearNum,
        undefined,
        undefined,
        undefined
      );
    },
    [day, month, hour, minute, ampm, monthsList]
  );

  const handleHourChange = useCallback(
    (newHour: string) => {
      setHour(newHour);

      // Create and validate new date
      updateDateWithCurrentValues(
        undefined,
        undefined,
        undefined,
        parseInt(newHour),
        undefined,
        undefined
      );
    },
    [day, month, year, minute, ampm, monthsList]
  );

  const handleMinuteChange = useCallback(
    (newMinute: string) => {
      setMinute(newMinute);

      // Create and validate new date
      updateDateWithCurrentValues(
        undefined,
        undefined,
        undefined,
        undefined,
        parseInt(newMinute),
        undefined
      );
    },
    [day, month, year, hour, ampm, monthsList]
  );

  const handleAmPmChange = useCallback(
    (newAmPm: string) => {
      setAmPm(newAmPm);

      // Create and validate new date
      updateDateWithCurrentValues(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        newAmPm
      );
    },
    [day, month, year, hour, minute, monthsList]
  );

  // Helper to update date based on current or new values
  const updateDateWithCurrentValues = useCallback(
    (
      dayNum?: number,
      monthNum?: number,
      yearNum?: number,
      hourNum?: number,
      minuteNum?: number,
      newAmPm?: string
    ) => {
      // Get current values if not provided
      const currentDay = dayNum ?? parseInt(day);

      const safeMonth = (month || monthsList[0]) as string;
      const monthIndex = monthsList.indexOf(safeMonth);
      const currentMonth = monthNum ?? (monthIndex !== -1 ? monthIndex : 0);

      const currentYear = yearNum ?? parseInt(year);

      let currentHour = hourNum ?? parseInt(hour);
      const currentMinute = minuteNum ?? parseInt(minute);
      const currentAmPm = newAmPm ?? ampm;

      // Convert hour to 24-hour format
      if (!use24Hour) {
        if (currentAmPm === 'PM' && currentHour < 12) {
          currentHour += 12;
        } else if (currentAmPm === 'AM' && currentHour === 12) {
          currentHour = 0;
        }
      }

      // Create and validate new date
      const newDate = new Date(
        currentYear,
        currentMonth,
        currentDay,
        currentHour,
        currentMinute
      );
      if (!isNaN(newDate.getTime())) {
        setTempDate(newDate);
      }
    },
    [day, month, year, hour, minute, ampm, monthsList, use24Hour]
  );

  // Explicit force update method to ensure UI syncs on both platforms
  const forceUIUpdate = useCallback(() => {
    // Force a UI refresh by creating a new tempDate object
    if (tempDate) {
      const newTempDate = new Date(tempDate.getTime());
      setTempDate(newTempDate);

      // Ensure the day, month, and year values are in sync with tempDate
      setDay(newTempDate.getDate().toString());
      setMonth(monthsList[newTempDate.getMonth()]);
      setYear(newTempDate.getFullYear().toString());

      // Update hour based on 12/24 hour format
      let h = newTempDate.getHours();
      if (!use24Hour) {
        setAmPm(h >= 12 ? 'PM' : 'AM');
        h = h % 12;
        h = h === 0 ? 12 : h; // Convert 0 to 12 for 12-hour format
      }
      setHour(h.toString().padStart(2, '0'));

      // Round minutes to nearest 5
      const mins = newTempDate.getMinutes();
      const roundedMins = Math.round(mins / 5) * 5;
      setMinute(
        (roundedMins === 60 ? 0 : roundedMins).toString().padStart(2, '0')
      );
    }
  }, [tempDate, monthsList, use24Hour]);

  // Sync wheel values with the date object
  const syncWheelsWithDate = useCallback(
    (date: Date) => {
      if (!isNaN(date.getTime())) {
        // Set all values directly from the date
        setDay(date.getDate().toString());
        setMonth(monthsList[date.getMonth()]);
        setYear(date.getFullYear().toString());

        // Update hour based on 12/24 hour format
        let h = date.getHours();
        if (!use24Hour) {
          setAmPm(h >= 12 ? 'PM' : 'AM');
          h = h % 12;
          h = h === 0 ? 12 : h; // Convert 0 to 12 for 12-hour format
        }
        setHour(h.toString().padStart(2, '0'));

        // Round minutes to nearest 5
        const mins = date.getMinutes();
        const roundedMins = Math.round(mins / 5) * 5;
        setMinute(
          (roundedMins === 60 ? 0 : roundedMins).toString().padStart(2, '0')
        );

        setTempDate(new Date(date)); // Create a new Date object
      }
    },
    [monthsList, use24Hour]
  );

  // ======== EFFECTS ========
  // Ensure UI is refreshed when values change
  useEffect(() => {
    const timer = setTimeout(forceUIUpdate, Platform.OS === 'ios' ? 50 : 100);
    return () => clearTimeout(timer);
  }, [day, month, year, hour, minute, ampm, forceUIUpdate]);

  // Handle external value changes
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      syncWheelsWithDate(value); // Sync all wheel values
    }
  }, [value, syncWheelsWithDate]);

  // Update monthsList if language changes
  useEffect(() => {
    if (tempDate) {
      // Update month to the correct language
      setMonth(monthsList[tempDate.getMonth()]);
    }
  }, [language, monthsList, tempDate]);

  // ======== HELPER FUNCTIONS ========
  // Generates picker title based on mode
  const getPickerTitle = useCallback(() => {
    switch (mode) {
      case 'date':
        return langConfig.pickerLabels.datePickerTitle;
      case 'time':
        return langConfig.pickerLabels.timePickerTitle;
      case 'datetime':
        return langConfig.pickerLabels.dateTimePickerTitle;
      default:
        return langConfig.pickerLabels.datePickerTitle;
    }
  }, [mode, langConfig]);

  // ======== RENDER COMPONENT ========
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          disabled && styles.disabledInputContainer,
        ]}
        onPress={openPicker}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text
          style={[
            styles.inputText,
            !value && styles.placeholderText,
            disabled && styles.disabledText,
          ]}
        >
          {formattedValue}
        </Text>
      </TouchableOpacity>

      <BottomSheet
        isOpen={isOpen}
        onClose={closePicker}
        snapPoints={[datePickerHeight]}
        enableGestureHandling={false}
      >
        <View style={styles.pickerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={closePicker}>
              <Text style={styles.cancelButtonText}>
                {langConfig.pickerLabels.cancelButton}
              </Text>
            </TouchableOpacity>
            <Text style={styles.pickerTitle}>{getPickerTitle()}</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={[styles.confirmButtonText, { color }]}>
                {langConfig.pickerLabels.confirmButton}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wheelsContainer}>
            {/* Date Pickers - conditionally rendered based on mode */}
            {(mode === 'date' || mode === 'datetime') && (
              <>
                {/* Day picker */}
                <View style={[styles.pickerColumn, styles.dayColumn]}>
                  <GradientView style={styles.gradientView} />
                  <WheelPickerColumn
                    data={days}
                    selectedValue={day}
                    onValueChange={handleDayChange}
                    pickerType="day"
                    color={color}
                  />
                </View>

                {/* Month picker */}
                <View style={[styles.pickerColumn, styles.monthColumn]}>
                  <GradientView style={styles.gradientView} />
                  <WheelPickerColumn
                    data={monthsList}
                    selectedValue={month || monthsList[0]}
                    onValueChange={handleMonthChange}
                    pickerType="month"
                    color={color}
                  />
                </View>

                {/* Year picker */}
                <View style={[styles.pickerColumn, styles.yearColumn]}>
                  <GradientView style={styles.gradientView} />
                  <WheelPickerColumn
                    data={years}
                    selectedValue={year}
                    onValueChange={handleYearChange}
                    pickerType="year"
                    color={color}
                  />
                </View>
              </>
            )}

            {/* Time Pickers - conditionally rendered based on mode */}
            {(mode === 'time' || mode === 'datetime') && (
              <>
                {/* Hour picker */}
                <View style={[styles.pickerColumn, styles.timeColumn]}>
                  <GradientView style={styles.gradientView} />
                  <WheelPickerColumn
                    data={hoursList}
                    selectedValue={hour}
                    onValueChange={handleHourChange}
                    pickerType="hour"
                    color={color}
                  />
                </View>

                {/* Minute picker */}
                <View style={[styles.pickerColumn, styles.timeColumn]}>
                  <GradientView style={styles.gradientView} />
                  <WheelPickerColumn
                    data={minutesList}
                    selectedValue={minute}
                    onValueChange={handleMinuteChange}
                    pickerType="minute"
                    color={color}
                  />
                </View>

                {/* AM/PM picker - only show in 12-hour mode */}
                {!use24Hour && (
                  <View style={[styles.pickerColumn, styles.ampmColumn]}>
                    <GradientView style={styles.gradientView} />
                    <WheelPickerColumn
                      data={ampmList}
                      selectedValue={ampm}
                      onValueChange={handleAmPmChange}
                      pickerType="ampm"
                      color={color}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

// ======== STYLES ========
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  disabledInputContainer: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  inputText: {
    color: '#1a1a1a',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  disabledText: {
    color: '#6B7280',
  },
  iconContainer: {
    marginLeft: 8,
  },
  calendarIcon: {
    fontSize: 18,
  },
  pickerContainer: {
    paddingBottom: 20,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  wheelsContainer: {
    flexDirection: 'row',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    paddingHorizontal: 25,
    position: 'relative',
  },
  selectionIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: (VISIBLE_ITEMS / 2) * ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(0, 102, 204, 0.08)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 102, 204, 0.15)',
    zIndex: 0,
  },
  pickerColumn: {
    position: 'relative',
    overflow: 'hidden',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    borderRadius: 8,
  },
  gradientView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  dayColumn: {
    flex: 1,
    minWidth: 50,
  },
  monthColumn: {
    flex: 4,
  },
  yearColumn: {
    flex: 2,
    minWidth: 80,
  },
  timeColumn: {
    flex: 1,
    minWidth: 60,
  },
  ampmColumn: {
    flex: 1,
    minWidth: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  confirmButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0066CC',
  },
});

export default WheelDatePicker;
