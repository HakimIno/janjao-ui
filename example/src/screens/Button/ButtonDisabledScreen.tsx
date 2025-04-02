import { Button } from '../../../../src';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from './styles';

const ButtonDisabledScreen = () => {
  const handlePress = () => console.log('Button pressed');
  const { width } = useWindowDimensions();
  const buttonWidth = width - 32;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled States</Text>
        <View style={styles.grid}>
          <Button
            title="Solid"
            variant="solid"
            color="#0ea5e9"
            disabled
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Bordered"
            variant="bordered"
            color="#4f46e5"
            disabled
            style={{ width: buttonWidth, borderStyle: 'dashed' }}
            onPress={handlePress}
          />
          <Button
            title="Solid"
            variant="solid"
            color="#db2777"
            disabled
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Bordered"
            variant="bordered"
            color="#22c55e"
            disabled
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading States</Text>
        <View style={styles.grid}>
          <Button
            title="Loading"
            variant="solid"
            color="#2563eb"
            loading
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Loading"
            variant="bordered"
            color="#ef4444"
            loading
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Loading"
            variant="light"
            color="#db2777"
            loading
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
          <Button
            title="Loading"
            variant="shadow"
            color="#4f46e5"
            loading
            style={{ width: buttonWidth }}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default ButtonDisabledScreen;
