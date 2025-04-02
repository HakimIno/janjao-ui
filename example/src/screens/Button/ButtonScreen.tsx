import React from 'react';
import { Button } from '../../../../src';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ButtonScreen = () => {
  const handlePress = () => console.log('Button pressed');
  const { width } = useWindowDimensions();
  const buttonWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1e3a8a', '#1e3a8a']} style={styles.gradient}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Button Variants Showcase */}
            <Section title="Button Variants">
              <View style={styles.grid}>
                <Button
                  title="Solid"
                  variant="solid"
                  color="#0ea5e9"
                  style={{ width: buttonWidth }}
                  onPress={handlePress}
                />
                <Button
                  title="Faded"
                  variant="faded"
                  color="#0ea5e9"
                  style={{ width: buttonWidth }}
                  onPress={handlePress}
                />
                <Button
                  title="Bordered"
                  variant="bordered"
                  color="#0ea5e9"
                  style={{ width: buttonWidth }}
                  onPress={handlePress}
                />
                <Button
                  title="Light"
                  variant="light"
                  color="#0ea5e9"
                  style={{ width: buttonWidth }}
                  onPress={handlePress}
                />
                <Button
                  title="Flat"
                  variant="flat"
                  color="#0ea5e9"
                  style={{ width: buttonWidth }}
                  onPress={handlePress}
                />
                <Button
                  title="Ghost"
                  variant="ghost"
                  color="#0ea5e9"
                  style={{ width: buttonWidth }}
                  onPress={handlePress}
                />
                <Button
                  title="Shadow"
                  variant="shadow"
                  color="#0ea5e9"
                  style={{ width: buttonWidth }}
                  onPress={handlePress}
                />
                <Button
                  title="dashed"
                  variant="bordered"
                  color="#0ea5e9"
                  style={{ width: buttonWidth, borderStyle: 'dashed' }}
                  onPress={handlePress}
                />
              </View>
            </Section>

            {/* Button States */}
            <Section title="Button States">
              <View style={styles.grid}>
                <Button
                  title="Loading"
                  variant="solid"
                  color="#007AFF"
                  loading
                  style={{ width: buttonWidth }}
                />
                <Button
                  title="Disabled"
                  variant="solid"
                  color="#007AFF"
                  disabled
                  style={{ width: buttonWidth }}
                />
              </View>
            </Section>

            {/* Button Sizes */}
            <Section title="Button Sizes">
              <View style={styles.grid}>
                <Button
                  title="Small"
                  variant="solid"
                  color="#4f46e5"
                  size="small"
                  style={{ width: buttonWidth }}
                />
                <Button
                  title="Medium"
                  variant="solid"
                  color="#a3e635"
                  size="medium"
                  style={{ width: buttonWidth }}
                />
              </View>
              <Button
                title="Large"
                variant="solid"
                color="#0ea5e9"
                size="large"
                fullWidth
              />
            </Section>

            {/* Special Buttons */}
            <Section title="Special Buttons">
              <View style={styles.grid}>
                <Button
                  title="Rounded"
                  variant="solid"
                  color="#0ea5e9"
                  rounded
                  style={{ width: buttonWidth }}
                />
                <Button
                  title=""
                  variant="solid"
                  color="#0ea5e9"
                  rounded
                  isIconOnly
                  icon={<Text style={styles.icon}>★</Text>}
                  style={styles.iconButton}
                />
              </View>
            </Section>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Reusable Section Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
    marginTop: 50,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E6F0FA',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  iconButton: {
    width: 48,
    height: 48,
  },
  icon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default ButtonScreen;
