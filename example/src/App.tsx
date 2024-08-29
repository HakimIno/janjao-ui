import { StyleSheet, View } from 'react-native';
import { Button } from '@janjao/ui';

export default function App() {
  const handlePress = () => {
    console.log('Button pressed');
  };

  const colorsBtn = 'crimson';

  return (
    <View style={styles.container}>
      <Button
        title="Solid"
        onPress={handlePress}
        backgroundColorOption={{
          variant: 'solid',
          color: colorsBtn,
          mode: 'light',
          level: '8',
        }}
        animated
        textStyle={styles.btnTitle}
        style={styles.btnContainer}
      />
      <Button
        title="Soft"
        onPress={handlePress}
        backgroundColorOption={{
          variant: 'soft',
          color: colorsBtn,
          mode: 'light',
          level: '8',
        }}
        animated
        loading={false}
        textStyle={styles.btnTitle}
        style={styles.btnContainer}
      />
      <Button
        title="Outline"
        onPress={handlePress}
        backgroundColorOption={{
          variant: 'outline',
          color: colorsBtn,
          mode: 'light',
          level: '8',
        }}
        animated
        loading={false}
        textStyle={styles.btnTitle}
        style={styles.btnContainer}
      />
      <Button
        title="Surface"
        onPress={handlePress}
        backgroundColorOption={{
          variant: 'surface',
          color: colorsBtn,
          mode: 'light',
          level: '8',
        }}
        animated
        loading={false}
        textStyle={styles.btnTitle}
        style={styles.btnContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  btnContainer: {
    borderRadius: 100,
    width: 250,
    minHeight: 45,
    justifyContent: 'center',
  },
  btnTitle: {
    fontWeight: 'bold',
  },
});
