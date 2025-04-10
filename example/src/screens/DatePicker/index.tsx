import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { DatePicker } from '../../../../src/components/ui';

const DatePickerScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [rangeDate, setRangeDate] = useState<Date | undefined>(new Date());
  const [yearViewDate, setYearViewDate] = useState<Date | undefined>();
  const [timeDate, setTimeDate] = useState<Date | undefined>(() => {
    // ตั้งค่าเริ่มต้นเป็น 6:20 AM
    const date = new Date();
    date.setHours(6);
    date.setMinutes(20);
    return date;
  });

  const [language, setLanguage] = useState<'th' | 'en'>('th');

  const PickerComponent = DatePicker;

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleRangeDateChange = useCallback((date: Date) => {
    setRangeDate(date);
  }, []);

  const handleYearViewDateChange = useCallback((date: Date) => {
    setYearViewDate(date);
  }, []);

  const handleTimeChange = useCallback((date: Date) => {
    setTimeDate(date);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'th' ? 'en' : 'th'));
  }, []);

  const getFormattedDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getFormattedTime = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === 'th' ? 'ตัวอย่างตัวเลือกวันที่' : 'Date Picker Demo'}
        </Text>
        <View style={styles.languageToggle}>
          <Text style={styles.languageLabel}>
            {language === 'th' ? 'TH' : 'EN'}
          </Text>
          <Switch
            trackColor={{ false: '#e0e0e0', true: '#bae6fd' }}
            thumbColor={language === 'en' ? '#4f46e5' : '#64748b'}
            ios_backgroundColor="#e0e0e0"
            onValueChange={toggleLanguage}
            value={language === 'en'}
            style={styles.switch}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pickerWrapper}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>
                {language === 'th' ? 'วันที่ปกติ' : 'Date'}
              </Text>
              {selectedDate && (
                <Text style={styles.selectedDateText}>
                  {getFormattedDate(selectedDate)}
                </Text>
              )}
            </View>
            <PickerComponent
              value={selectedDate}
              onChange={handleDateChange}
              format={language === 'th' ? 'D MMMM YYYY' : 'MMMM D, YYYY'}
              language={language}
              color="#4f46e5"
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>
                {language === 'th' ? 'เวลา (AM/PM)' : 'Time (AM/PM)'}
              </Text>
              {timeDate && (
                <Text style={styles.selectedDateText}>
                  {getFormattedTime(timeDate)}
                </Text>
              )}
            </View>
            <PickerComponent
              value={timeDate}
              onChange={handleTimeChange}
              mode="time"
              language={language}
              placeholder={language === 'th' ? 'เลือกเวลา' : 'Select time'}
              color="#4f46e5"
              use24Hour={false}
            />
          </View>

          <Text style={styles.sectionTitle}>
            {language === 'th' ? 'ตัวเลือกเพิ่มเติม' : 'Additional Options'}
          </Text>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>
                {language === 'th'
                  ? 'ขอบเขตวันที่ (2022-2025)'
                  : 'Date Range (2022-2025)'}
              </Text>
            </View>
            <PickerComponent
              value={rangeDate}
              onChange={handleRangeDateChange}
              minDate={new Date(2022, 0, 1)}
              maxDate={new Date(2025, 11, 31)}
              format={language === 'th' ? 'D MMMM YYYY' : 'MMMM D, YYYY'}
              language={language}
              color="#4f46e5"
            />
          </View>

          <View style={[styles.section]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>
                {language === 'th' ? 'ปิดการใช้งาน' : 'Disabled'}
              </Text>
            </View>
            <PickerComponent
              value={selectedDate}
              disabled
              language={language}
              color="#4f46e5"
            />
          </View>

          <View style={[styles.section]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>
                {language === 'th' ? 'รูปแบบกำหนดเอง' : 'Custom Format'}
              </Text>
            </View>
            <PickerComponent
              value={yearViewDate}
              onChange={handleYearViewDateChange}
              format="YYYY-MM-DD"
              language={language}
              placeholder={language === 'th' ? 'เลือกวันที่' : 'Select date'}
              color="#4f46e5"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            const today = new Date();
            setSelectedDate(today);
            setRangeDate(today);
            setYearViewDate(undefined);

            // รีเซ็ตเวลาเป็น 6:20 AM
            const defaultTime = new Date();
            defaultTime.setHours(6);
            defaultTime.setMinutes(20);
            setTimeDate(defaultTime);

          }}
        >
          <Text style={styles.resetButtonText}>
            {language === 'th' ? 'รีเซ็ตทั้งหมด' : 'Reset All'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  scrollContainer: {
    padding: 8,
  },
  pickerWrapper: {
    marginBottom: 20,
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageLabel: {
    marginRight: 8,
    color: '#64748b',
    fontWeight: '600',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 10,
    marginBottom: 16,
    paddingLeft: 4,
  },
  label: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  selectedDateText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  resetButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  resetButtonText: {
    color: '#4f46e5',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DatePickerScreen;
