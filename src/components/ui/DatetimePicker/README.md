# Wheel Date Picker Component

A customizable date and time picker component for React Native that supports multiple languages.

## Features

- Supports date, time, and datetime picker modes
- Multiple language support (Thai, English, and extendable to other languages)
- Customizable date format
- Customizable colors
- Min/max date constraints
- Accessibility features
- Full wheel-style picker UI

## Usage

```jsx
import { useState } from 'react';
import WheelDatePicker from './components/ui/DatetimePicker/WheelDatePicker';

const MyComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <WheelDatePicker
      value={date}
      onChange={setDate}
      mode="date" // 'date', 'time', or 'datetime'
      format="MMMM D, YYYY" // Custom date format
      language="en" // 'th' for Thai, 'en' for English
      placeholder="Select a date"
      color="#0066CC" // Primary color for selected items
    />
  );
};
```

## Props

| Prop          | Type                             | Default          | Description                               |
| ------------- | -------------------------------- | ---------------- | ----------------------------------------- |
| `value`       | `Date`                           | `undefined`      | The currently selected date               |
| `onChange`    | `(date: Date) => void`           | `undefined`      | Callback when date changes                |
| `minDate`     | `Date`                           | `undefined`      | Minimum selectable date                   |
| `maxDate`     | `Date`                           | `undefined`      | Maximum selectable date                   |
| `placeholder` | `string`                         | `'เลือกวันที่'`  | Placeholder text when no date is selected |
| `format`      | `string`                         | `'MMM DD, YYYY'` | Format string for the date display        |
| `disabled`    | `boolean`                        | `false`          | Whether the picker is disabled            |
| `color`       | `string`                         | `'#0066CC'`      | Primary color for the picker              |
| `mode`        | `'date' \| 'time' \| 'datetime'` | `'date'`         | Picker mode                               |
| `language`    | `'th' \| 'en' \| string`         | `'th'`           | Language for month names and UI elements  |

## Date Format

The component supports various date format tokens:

| Token  | Description             | Example                |
| ------ | ----------------------- | ---------------------- |
| `D`    | Day of month            | 1, 2, ..., 31          |
| `DD`   | Day of month (2 digits) | 01, 02, ..., 31        |
| `M`    | Month number            | 1, 2, ..., 12          |
| `MM`   | Month number (2 digits) | 01, 02, ..., 12        |
| `MMM`  | Short month name        | Jan, Feb, ...          |
| `MMMM` | Full month name         | January, February, ... |
| `YY`   | Year (2 digits)         | 23, 24, ...            |
| `YYYY` | Year (4 digits)         | 2023, 2024, ...        |
| `H`    | Hour (24h)              | 0, 1, ..., 23          |
| `HH`   | Hour (24h, 2 digits)    | 00, 01, ..., 23        |
| `m`    | Minute                  | 0, 1, ..., 59          |
| `mm`   | Minute (2 digits)       | 00, 01, ..., 59        |
| `A`    | AM/PM                   | AM, PM                 |
| `a`    | am/pm                   | am, pm                 |

## Multi-language Support

The component supports multiple languages for displaying month names and UI elements. Currently, Thai (`'th'`) and English (`'en'`) are built-in, but you can extend this by adding more languages to the `LANGUAGE_CONFIGS` in `utils.ts`.

### Example of adding a new language:

```javascript
// In utils.ts
export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  th: { /* existing Thai config */ },
  en: { /* existing English config */ },

  // Add a new language (Spanish)
  es: {
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    shortMonths: [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ],
    pickerLabels: {
      datePickerTitle: 'Seleccionar fecha',
      timePickerTitle: 'Seleccionar hora',
      dateTimePickerTitle: 'Seleccionar fecha y hora',
      cancelButton: 'Cancelar',
      confirmButton: 'Confirmar'
    }
  }
};
```

## Example

See `DatePickerExample.tsx` for a complete example of using the date picker with language switching.
