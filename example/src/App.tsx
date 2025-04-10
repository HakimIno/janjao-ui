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
import AccordionMenu from './screens/AccordionVariants/AccordionMenu';
import AccordionVariantDetail from './screens/AccordionVariants/AccordionVariantDetail';
import TextInputAccordionExample from './screens/TextInputAccordionExample';
import CheckBoxScreen from './screens/CheckBox';
import DatePickerScreen from './screens/DatePicker';

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
        Accordion: {
          path: 'accordion',
          screens: {
            AccordionMenu: 'accordion',
            AccordionVariantDetail: 'accordion/:variant',
            TextInputAccordionExample: 'accordion/text-input',
          },
        },
        CheckBox: {
          path: 'checkbox',
          screens: {
            CheckBoxScreen: 'checkbox',
          },
        },
        DatePicker: {
          path: 'datepicker',
          screens: {
            DatePickerScreen: 'datepicker',
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Button" component={ButtonNavigator} />
        <Stack.Screen name="Accordion" component={AccordionNavigator} />
        <Stack.Screen name="CheckBox" component={CheckBoxNavigator} />
        <Stack.Screen name="DatePicker" component={DatePickerNavigator} />
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
      <Stack.Screen name="AccordionMenu" component={AccordionMenu} />
      <Stack.Screen
        name="AccordionVariantDetail"
        component={AccordionVariantDetail}
      />
      <Stack.Screen
        name="TextInputAccordionExample"
        component={TextInputAccordionExample}
      />
    </Stack.Navigator>
  );
}

function CheckBoxNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckBoxScreen" component={CheckBoxScreen} />
    </Stack.Navigator>
  );
}

function DatePickerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DatePickerScreen" component={DatePickerScreen} />
    </Stack.Navigator>
  );
}
