import { StyleSheet, View, ScrollView } from 'react-native';
import type { Category } from '../../../../src/components/ui/Accordion';
import { Accordion } from '../../../../src';

const AccordionScreen = () => {
  const mockNestedItems: Category[] = [
    {
      title: 'Section 1',
      content: ['Item 1', 'Item 2', 'Item 3'],
      contentNested: [],
      type: 'regular',
    },
    {
      title: 'Section 2',
      content: ['Item A', 'Item B', 'Item C', 'Item D'],
      contentNested: [],
      type: 'regular',
    },
    {
      title: 'Section 3',
      content: ['Thing 1', 'Thing 2'],
      contentNested: [],
      type: 'regular',
    },
    {
      title: 'Section 4',
      content: ['Item A', 'Item B', 'Item C', 'Item D'],
      contentNested: [],
      type: 'regular',
    },
    {
      title: 'Section 5',
      content: ['Item A', 'Item B', 'Item C', 'Item D'],
      contentNested: [],
      type: 'regular',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {mockNestedItems.map((value, index) => {
          return <Accordion value={value} key={index} type={value.type} />;
        })}
      </ScrollView>
    </View>
  );
};

export default AccordionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
