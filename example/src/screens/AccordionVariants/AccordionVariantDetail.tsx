import { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import AccordionUnified from '../../../../src/components/ui/Accordion/AccordionUnified';
import { sampleData, compactData } from './accordionData';

type RouteParams = {
  variant: string;
};

type VariantConfigType = {
  title: string;
  subtitle: string;
  variant: string;
  theme: string;
  defaultOpenIds?: string[];
  color: string;
  description: string;
  isDark?: boolean;
};

type VariantConfigMap = {
  [key: string]: VariantConfigType;
};

const AccordionVariantDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { variant } = route.params ?? { variant: 'shadow' };
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#1e40af',
        },
        header: {
          marginTop: screenHeight * 0.06,
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
          fontSize: Math.min(screenWidth * 0.045, 22),
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: 0.5,
        },
        headerSubtitle: {
          fontSize: Math.min(screenWidth * 0.035, 16),
          color: 'rgba(255, 255, 255, 0.85)',
          marginTop: 4,
          fontWeight: '400',
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
          fontSize: Math.min(screenWidth * 0.045, 22),
          fontWeight: '500',
        },
        scrollView: {
          flex: 1,
        },
        scrollContent: {
          padding: screenWidth * 0.04,
          paddingBottom: screenHeight * 0.08,
        },
        descriptionContainer: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: Math.min(screenWidth * 0.04, 16),
          padding: screenWidth * 0.03,
          marginBottom: screenHeight * 0.02,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
        },
        darkDescriptionContainer: {
          backgroundColor: '#1F2937',
        },
        descriptionText: {
          fontSize: Math.min(screenWidth * 0.035, 15),
          lineHeight: Math.min(screenWidth * 0.055, 22),
          color: '#6B7280',
          fontWeight: '400',
        },
        darkDescriptionText: {
          color: '#D1D5DB',
        },
        accordionContainer: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: Math.min(screenWidth * 0.04, 16),
          padding: screenWidth * 0.03,
          marginBottom: screenHeight * 0.02,
        },
        darkAccordionContainer: {
          backgroundColor: '#1F2937',
        },
        accordionTitle: {
          fontSize: Math.min(screenWidth * 0.045, 18),
          fontWeight: '600',
          color: '#111827',
          marginBottom: screenHeight * 0.02,
          letterSpacing: 0.2,
        },
        darkAccordionTitle: {
          color: '#ffffff',
        },
        divider: {
          height: 1,
          backgroundColor: 'rgba(229, 231, 235, 0.5)',
          marginVertical: screenHeight * 0.02,
        },
      }),
    [screenWidth, screenHeight]
  );

  const variantConfig = useMemo<VariantConfigMap>(
    () => ({
      shadow: {
        title: 'Shadow Accordion',
        subtitle: 'Elevated style with shadow effects',
        variant: 'shadow',
        theme: 'purple',
        defaultOpenIds: ['1'],
        color: '#4f46e5',
        description:
          'The Shadow accordion uses elevation and shadow effects to create a modern, layered interface.',
      },
      bordered: {
        title: 'Bordered Accordion',
        subtitle: 'Clean style with defined borders',
        variant: 'bordered',
        theme: 'blue',
        defaultOpenIds: ['2'],
        color: '#1A56DB',
        description:
          'The Bordered accordion uses distinct borders for clear content delineation.',
      },
      light: {
        title: 'Light Accordion',
        subtitle: 'Subtle design with light backgrounds',
        variant: 'light',
        theme: 'green',
        defaultOpenIds: ['3'],
        color: '#84cc16',
        description:
          'The Light accordion employs soft contrasts for a gentle hierarchy.',
      },
      splitted: {
        title: 'Splitted Accordion',
        subtitle: 'Separated sections with clear spacing',
        variant: 'splitted',
        theme: 'orange',
        defaultOpenIds: ['2.1'],
        color: '#FF5A1F',
        description:
          'The Splitted accordion improves scannability with clear separation.',
      },
      flat: {
        title: 'Flat Accordion',
        subtitle: 'Modern flat design with minimal depth',
        variant: 'flat',
        theme: 'gray',
        defaultOpenIds: [],
        color: '#4B5563',
        description:
          'The Flat accordion focuses on color and typography for organization.',
      },
      minimal: {
        title: 'Minimal Accordion',
        subtitle: 'Minimalist style with dark theme',
        variant: 'minimal',
        theme: 'dark',
        defaultOpenIds: [],
        color: '#252F3F',
        isDark: true,
        description: 'The Minimal accordion delivers distraction-free content.',
      },
      all: {
        title: 'All Variants',
        subtitle: 'Showcase of all accordion styles',
        variant: 'all',
        theme: 'all',
        color: '#1d4ed8',
        description: 'Compare all accordion variants in one view.',
      },
    }),
    []
  );

  const selectedVariant = useMemo(() => {
    return variantConfig[variant] || variantConfig.shadow;
  }, [variant, variantConfig]);

  const renderAccordion = (
    type: string,
    theme: string,
    compact: boolean = false
  ) => {
    return (
      <AccordionUnified
        data={compact ? compactData : sampleData}
        variant={type as any}
        theme={theme}
        animationType="timing"
        animationDuration={300}
        defaultOpenIds={selectedVariant?.defaultOpenIds || []}
        compact={compact}
      />
    );
  };

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
          <Text style={styles.headerTitle}>
            {selectedVariant?.title || 'Accordion'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {selectedVariant?.subtitle || 'Customizable component'}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.descriptionContainer,
            selectedVariant?.isDark && styles.darkDescriptionContainer,
          ]}
        >
          <Text
            style={[
              styles.descriptionText,
              selectedVariant?.isDark && styles.darkDescriptionText,
            ]}
          >
            {selectedVariant?.description ||
              'A versatile accordion component for organizing content.'}
          </Text>
        </View>

        <View
          style={[
            styles.accordionContainer,
            selectedVariant?.isDark && styles.darkAccordionContainer,
          ]}
        >
          <Text
            style={[
              styles.accordionTitle,
              selectedVariant?.isDark && styles.darkAccordionTitle,
            ]}
          >
            Standard Accordion
          </Text>
          {renderAccordion(
            (selectedVariant?.variant as string) || 'shadow',
            (selectedVariant?.theme as string) || 'purple'
          )}
        </View>

        <View
          style={[
            styles.accordionContainer,
            selectedVariant?.isDark && styles.darkAccordionContainer,
          ]}
        >
          <Text
            style={[
              styles.accordionTitle,
              selectedVariant?.isDark && styles.darkAccordionTitle,
            ]}
          >
            Compact Accordion
          </Text>
          {renderAccordion(
            (selectedVariant?.variant as string) || 'shadow',
            (selectedVariant?.theme as string) || 'purple',
            true
          )}
        </View>

        {variant === 'all' ? (
          Object.entries(variantConfig)
            .filter(([key]) => key !== 'all')
            .map(([key, config], index) => (
              <View
                key={key}
                style={[
                  styles.accordionContainer,
                  config.isDark && styles.darkAccordionContainer,
                ]}
              >
                <Text
                  style={[
                    styles.accordionTitle,
                    config.isDark && styles.darkAccordionTitle,
                  ]}
                >
                  {config.title}
                </Text>
                {renderAccordion(
                  config.variant as string,
                  config.theme as string
                )}
                {index < Object.keys(variantConfig).length - 2 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))
        ) : (
          <>
            <View
              style={[
                styles.accordionContainer,
                selectedVariant?.isDark && styles.darkAccordionContainer,
              ]}
            >
              <Text
                style={[
                  styles.accordionTitle,
                  selectedVariant?.isDark && styles.darkAccordionTitle,
                ]}
              >
                Standard Example
              </Text>
              {renderAccordion(
                (selectedVariant?.variant as string) || 'shadow',
                (selectedVariant?.theme as string) || 'purple'
              )}
            </View>

            <View
              style={[
                styles.accordionContainer,
                selectedVariant?.isDark && styles.darkAccordionContainer,
              ]}
            >
              <Text
                style={[
                  styles.accordionTitle,
                  selectedVariant?.isDark && styles.darkAccordionTitle,
                ]}
              >
                Compact Example
              </Text>
              {renderAccordion(
                (selectedVariant?.variant as string) || 'shadow',
                (selectedVariant?.theme as string) || 'purple',
                true
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccordionVariantDetail;
