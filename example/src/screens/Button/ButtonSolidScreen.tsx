import { Button } from '../../../../src';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from './styles';

const ButtonSolidScreen = () => {
  const handlePress = () => console.log('Button pressed');
  const { width } = useWindowDimensions();
  const buttonWidth = width - 32;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Solid Buttons</Text>
        <View style={styles.grid}>
          <Button
            title="Primary"
            variant="solid"
            color="#0ea5e9"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Success"
            variant="solid"
            color="#22c55e"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Warning"
            variant="solid"
            color="#f59e0b"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Danger"
            variant="solid"
            color="#ef4444"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default ButtonSolidScreen;
