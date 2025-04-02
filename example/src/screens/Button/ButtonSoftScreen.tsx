import { Button } from '../../../../src';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from './styles';

const ButtonSoftScreen = () => {
  const handlePress = () => console.log('Button pressed');
  const { width } = useWindowDimensions();
  const buttonWidth = width - 32;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Light Buttons</Text>
        <View style={styles.grid}>
          <Button
            title="Primary"
            variant="light"
            color="#2563eb"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Success"
            variant="light"
            color="#22c55e"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Primary"
            variant="light"
            color="#4f46e5"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Success"
            variant="light"
            color="#db2777"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Faded Buttons</Text>
        <View style={styles.grid}>
          <Button
            title="Warning"
            variant="faded"
            color="#f59e0b"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Danger"
            variant="faded"
            color="#ef4444"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Warning"
            variant="faded"
            color="#db2777"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Danger"
            variant="faded"
            color="#2563eb"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default ButtonSoftScreen;
