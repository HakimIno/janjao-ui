import type {
  MonthName,
  ShortMonthName,
  LanguageConfig,
} from './datepicker.type';

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  th: {
    months: [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ],
    shortMonths: [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ],
    pickerLabels: {
      datePickerTitle: 'เลือกวันที่',
      timePickerTitle: 'เลือกเวลา',
      dateTimePickerTitle: 'เลือกวันที่และเวลา',
      cancelButton: 'ยกเลิก',
      confirmButton: 'ยืนยัน',
    },
  },
  en: {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    pickerLabels: {
      datePickerTitle: 'Select Date',
      timePickerTitle: 'Select Time',
      dateTimePickerTitle: 'Select Date and Time',
      cancelButton: 'Cancel',
      confirmButton: 'Confirm',
    },
  },
};

// Default to Thai if not specified
export const getLanguageConfig = (language = 'th'): LanguageConfig => {
  if (language in LANGUAGE_CONFIGS) {
    return LANGUAGE_CONFIGS[language] as LanguageConfig;
  }
  return LANGUAGE_CONFIGS.th as LanguageConfig;
};

// Helper function to get months based on language
export const getMonths = (language = 'th'): MonthName[] => {
  return getLanguageConfig(language).months;
};

// Helper function to get short months based on language
export const getShortMonths = (language = 'th'): ShortMonthName[] => {
  return getLanguageConfig(language).shortMonths;
};

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Time utilities
export const getHours = (use24Hour = false): string[] => {
  const hours = [];

  if (use24Hour) {
    // 24-hour format: 00-23
    for (let i = 0; i < 24; i++) {
      hours.push(i.toString().padStart(2, '0'));
    }
  } else {
    // 12-hour format: 01-12
    for (let i = 1; i <= 12; i++) {
      hours.push(i.toString().padStart(2, '0'));
    }
  }

  return hours;
};

export const getMinutes = (interval = 1): string[] => {
  const minutes = [];
  for (let i = 0; i < 60; i += interval) {
    minutes.push(i.toString().padStart(2, '0'));
  }
  return minutes;
};

export const getAmPm = (): string[] => {
  return ['AM', 'PM'];
};

export const formatTime = (date: Date, use24Hour = false): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (!use24Hour) {
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be displayed as 12 in 12-hour format
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${!use24Hour ? ` ${ampm}` : ''}`;
};

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function generateCalendarDays(
  year: number,
  month: number
): (number | null)[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const days: (number | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
}

export function isDateInRange(
  date: Date,
  minDate?: Date,
  maxDate?: Date
): boolean {
  const time = date.getTime();

  if (minDate && time < minDate.getTime()) {
    return false;
  }

  if (maxDate && time > maxDate.getTime()) {
    return false;
  }

  return true;
}

export function getYearRange(centerYear: number, range: number = 10): number[] {
  const years: number[] = [];
  const startYear = centerYear - range;
  const endYear = centerYear + range;

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return years;
}

export const getYears = (startYear = 1950, endYear = 2050): string[] => {
  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i.toString());
  }
  return years;
};

export const getDaysInMonth = (month: number, year: number): string[] => {
  const days = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i.toString());
  }
  return days;
};

export const formatDate = (
  date: Date,
  format: string,
  language = 'th'
): string => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const config = getLanguageConfig(language);

  // Make sure format is a non-null string
  let result = format || `${config.months[month]} ${day}, ${year}`;

  // Replace tokens with actual values
  result = result.replace(/DD/g, day.toString().padStart(2, '0'));
  result = result.replace(/D/g, day.toString());

  // Use month names based on language
  result = result.replace(/MMMM/g, config.months[month] || '');
  result = result.replace(/MMM/g, config.shortMonths[month] || '');
  result = result.replace(/MM/g, (month + 1).toString().padStart(2, '0'));
  result = result.replace(/M/g, (month + 1).toString());

  result = result.replace(/YYYY/g, year.toString());
  result = result.replace(/YY/g, year.toString().slice(-2));

  result = result.replace(/HH/g, hours.toString().padStart(2, '0'));
  result = result.replace(/H/g, hours.toString());

  result = result.replace(/mm/g, minutes.toString().padStart(2, '0'));
  result = result.replace(/m/g, minutes.toString());

  // Add AM/PM indicator if needed
  result = result.replace(/A/g, hours >= 12 ? 'PM' : 'AM');
  result = result.replace(/a/g, hours >= 12 ? 'pm' : 'am');

  return result;
};
