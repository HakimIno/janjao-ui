import { Button } from '../../../../src';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from './styles';

const ButtonSurfaceScreen = () => {
  const handlePress = () => console.log('Button pressed');
  const { width } = useWindowDimensions();
  const buttonWidth = width - 32;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flat Buttons</Text>
        <View style={styles.grid}>
          <Button
            title="Primary"
            variant="flat"
            color="#2563eb"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Success"
            variant="flat"
            color="#22c55e"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Primary"
            variant="flat"
            color="#4f46e5"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Success"
            variant="flat"
            color="#db2777"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ghost Buttons</Text>
        <View style={styles.grid}>
          <Button
            title="Warning"
            variant="ghost"
            color="#f59e0b"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Danger"
            variant="ghost"
            color="#ef4444"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Warning"
            variant="ghost"
            color="#4f46e5"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Danger"
            variant="ghost"
            color="#db2777"
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default ButtonSurfaceScreen;
