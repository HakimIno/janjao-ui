import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccordionVariantsScreen = () => {
  const navigation = useNavigation();

  const variants = [
    {
      name: 'Shadow',
      route: 'ShadowAccordion',
      theme: 'purple',
      description: 'Default shadow effect with purple theme',
    },
    {
      name: 'Bordered',
      route: 'BorderedAccordion',
      theme: 'blue',
      description: 'Bordered style with blue theme',
    },
    {
      name: 'Light',
      route: 'LightAccordion',
      theme: 'green',
      description: 'Light background with green theme',
    },
    {
      name: 'Splitted',
      route: 'SplittedAccordion',
      theme: 'orange',
      description: 'Split sections with orange theme',
    },
    {
      name: 'Flat',
      route: 'FlatAccordion',
      theme: 'gray',
      description: 'Flat design with gray theme',
    },
    {
      name: 'Minimal',
      route: 'MinimalAccordion',
      theme: 'dark',
      description: 'Minimal design with dark theme',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accordion Variants</Text>
        <Text style={styles.headerSubtitle}>Select a variant to explore</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {variants.map((variant, index) => (
          <TouchableOpacity
            key={index}
            style={styles.variantButton}
            onPress={() => navigation.navigate(variant.route as never)}
          >
            <View style={styles.variantInfo}>
              <Text style={styles.variantName}>{variant.name}</Text>
              <Text style={styles.variantTheme}>{variant.theme}</Text>
            </View>
            <Text style={styles.variantDescription}>{variant.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
  },
  header: {
    padding: 20,
    backgroundColor: '#1d4ed8',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  variantButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  variantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  variantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a2b49',
  },
  variantTheme: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  variantDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
});

export default AccordionVariantsScreen;
