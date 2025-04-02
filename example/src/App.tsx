import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ButtonOutlineScreen,
  ButtonSolidScreen,
  ButtonDisabledScreen,
  ButtonSoftScreen,
  ButtonScreen,
} from './screens/Button';
import ButtonSurfaceScreen from './screens/Button/ButtonSurfaceScreen';
import AccordionScreen from './screens/Accordion';

const Stack = createStackNavigator();

export default function App() {
  const linking = {
    prefixes: ['http://localhost:8081'],
    config: {
      screens: {
        Button: {
          path: 'button',
          screens: {
            Solid: 'solid',
            Outline: 'outline',
            Soft: 'soft',
            Surface: 'surface',
            Disabled: 'disabled',
          },
        },
        Accordion: 'accordion',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Button" component={ButtonNavigator} />
        <Stack.Screen name="Accordion" component={AccordionNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ButtonNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UseButton" component={ButtonScreen} />
      <Stack.Screen name="Solid" component={ButtonSolidScreen} />
      <Stack.Screen name="Outline" component={ButtonOutlineScreen} />
      <Stack.Screen name="Soft" component={ButtonSoftScreen} />
      <Stack.Screen name="Surface" component={ButtonSurfaceScreen} />
      <Stack.Screen name="Disabled" component={ButtonDisabledScreen} />
    </Stack.Navigator>
  );
}

function AccordionNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Accordion" component={AccordionScreen} />
    </Stack.Navigator>
  );
}
