import { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AccordionUnified from '../../../src/components/ui/Accordion/AccordionUnified';
import type { AccordionItemData } from '../../../src/components/ui/Accordion/AccordionUnified';

const TextInputAccordionExample = () => {
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    workExperience: '',
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#1e40af',
        },
        header: {
          paddingTop: screenHeight * 0.06,
          padding: screenWidth * 0.04,
          backgroundColor: '#1e40af',
          flexDirection: 'row',
          alignItems: 'center',
        },
        headerTextContainer: {
          flex: 1,
          alignItems: 'center',
        },
        headerTitle: {
          fontSize: Math.min(screenWidth * 0.05, 24),
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: 0.5,
        },
        backButton: {
          width: Math.min(screenWidth * 0.1, 40),
          height: Math.min(screenWidth * 0.1, 40),
          borderRadius: Math.min(screenWidth * 0.05, 20),
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: screenWidth * 0.02,
        },
        backButtonText: {
          color: '#ffffff',
          fontSize: Math.min(screenWidth * 0.05, 20),
          fontWeight: '500',
        },
        scrollView: {
          flex: 1,
        },
        scrollContent: {
          padding: screenWidth * 0.04,
          paddingBottom: screenHeight * 0.08,
        },
        accordionContainer: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: Math.min(screenWidth * 0.04, 16),
          padding: screenWidth * 0.04,
          marginBottom: screenHeight * 0.02,
        },
        inputContainer: {
          width: '100%',
        },
        inputRow: {
          marginBottom: screenHeight * 0.02,
        },
        inputLabel: {
          fontSize: Math.min(screenWidth * 0.035, 14),
          fontWeight: '500',
          color: '#4B5563',
          marginBottom: screenHeight * 0.01,
        },
        textInput: {
          backgroundColor: '#F9FAFB',
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: Math.min(screenWidth * 0.02, 8),
          paddingHorizontal: screenWidth * 0.04,
          paddingVertical: screenHeight * 0.015,
          fontSize: Math.min(screenWidth * 0.04, 16),
          color: '#1F2937',
        },
        textAreaInput: {
          height: screenHeight * 0.12,
          textAlignVertical: 'top',
        },
        submitButton: {
          backgroundColor: '#1d4ed8',
          borderRadius: Math.min(screenWidth * 0.025, 10),
          padding: screenWidth * 0.04,
          alignItems: 'center',
          marginTop: screenHeight * 0.01,
        },
        submitButtonText: {
          color: '#FFFFFF',
          fontSize: Math.min(screenWidth * 0.04, 16),
          fontWeight: '600',
        },
      }),
    [screenWidth, screenHeight]
  );

  // Handler for text input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Custom content with TextInput for personal information
  const personalInfoContent = (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>First Name:</Text>
        <TextInput
          style={styles.textInput}
          value={formData.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
          placeholder="Enter your first name"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Last Name:</Text>
        <TextInput
          style={styles.textInput}
          value={formData.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
          placeholder="Enter your last name"
        />
      </View>
    </View>
  );

  // Custom content with TextInput for contact information
  const contactInfoContent = (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          style={styles.textInput}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Phone:</Text>
        <TextInput
          style={styles.textInput}
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  // Custom content with TextInput for address
  const addressContent = (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Address:</Text>
        <TextInput
          style={[styles.textInput, styles.textAreaInput]}
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          placeholder="Enter your full address"
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );

  // Custom content with TextInput for education
  const educationContent = (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Education:</Text>
        <TextInput
          style={[styles.textInput, styles.textAreaInput]}
          value={formData.education}
          onChangeText={(text) => handleInputChange('education', text)}
          placeholder="Enter your education details"
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );

  // Custom content with TextInput for work experience
  const workExperienceContent = (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Work Experience:</Text>
        <TextInput
          style={[styles.textInput, styles.textAreaInput]}
          value={formData.workExperience}
          onChangeText={(text) => handleInputChange('workExperience', text)}
          placeholder="Enter your work experience"
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );

  // Sample data with TextInput components in content
  const accordionData: AccordionItemData[] = [
    {
      id: '1',
      title: 'Personal Information',
      content: personalInfoContent,
    },
    {
      id: '2',
      title: 'Contact Information',
      children: [
        {
          id: '2.1',
          title: 'Email & Phone',
          content: contactInfoContent,
        },
        {
          id: '2.2',
          title: 'Address',
          content: addressContent,
        },
      ],
    },
    {
      id: '3',
      title: 'Professional Information',
      children: [
        {
          id: '3.1',
          title: 'Education',
          content: educationContent,
        },
        {
          id: '3.2',
          title: 'Work Experience',
          content: workExperienceContent,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Accordion with Text Inputs</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.accordionContainer}>
          <AccordionUnified
            data={accordionData}
            variant="flat"
            theme="blue"
            animationType="timing"
            animationDuration={300}
            defaultOpenIds={['1']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TextInputAccordionExample;
