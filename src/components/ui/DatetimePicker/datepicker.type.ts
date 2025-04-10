export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  color?: string;
  mode?: 'date' | 'time' | 'datetime';
  language?: 'th' | 'en' | string;
  use24Hour?: boolean;
};

export type ThaiMonthName =
  | 'มกราคม'
  | 'กุมภาพันธ์'
  | 'มีนาคม'
  | 'เมษายน'
  | 'พฤษภาคม'
  | 'มิถุนายน'
  | 'กรกฎาคม'
  | 'สิงหาคม'
  | 'กันยายน'
  | 'ตุลาคม'
  | 'พฤศจิกายน'
  | 'ธันวาคม';

export type EnglishMonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type EnglishShortMonthName =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';

export type MonthName = string;
export type ShortMonthName = string;

export type LanguageConfig = {
  months: MonthName[];
  shortMonths: ShortMonthName[];
  pickerLabels: {
    datePickerTitle: string;
    timePickerTitle: string;
    dateTimePickerTitle: string;
    cancelButton: string;
    confirmButton: string;
  };
};

export type WheelPickerColumnProps = {
  data: string[];
  selectedValue: string | undefined;
  onValueChange: (value: string) => void;
  pickerType: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'ampm';
  color?: string;
};
