import { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
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
  backgroundColor?: string;
};

type VariantConfigMap = {
  [key: string]: VariantConfigType;
};

const AccordionVariantDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { variant } = route.params ?? { variant: 'shadow' };

  const variantConfig = useMemo<VariantConfigMap>(
    () => ({
      shadow: {
        title: 'Shadow Accordion',
        subtitle: 'Elevated style with shadow effects',
        variant: 'shadow',
        theme: 'purple',
        defaultOpenIds: ['1'],
        color: '#4f46e5',
        backgroundColor: '#EEF2FF',
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
        backgroundColor: '#EFF6FF',
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
        backgroundColor: '#F7FEE7',
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
        backgroundColor: '#FFF7ED',
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
        backgroundColor: '#F9FAFB',
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
        backgroundColor: '#111827',
        isDark: true,
        description: 'The Minimal accordion delivers distraction-free content.',
      },
      all: {
        title: 'All Variants',
        subtitle: 'Showcase of all accordion styles',
        variant: 'all',
        theme: 'all',
        color: '#1d4ed8',
        backgroundColor: '#F9FAFB',
        description: 'Compare all accordion variants in one view.',
      },
    }),
    []
  );

  const selectedVariant = useMemo((): VariantConfigType => {
    // If variant exists in config, use it; otherwise fall back to shadow variant
    const configVariant = variant in variantConfig ? variantConfig[variant] : variantConfig.shadow;
    // Add type assertion to satisfy TypeScript
    return configVariant as VariantConfigType;
  }, [variant, variantConfig]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: selectedVariant.color,
        },
        header: {
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: 24,
          backgroundColor: selectedVariant.color,
          flexDirection: 'row',
          alignItems: 'center',
        },
        headerTextContainer: {
          flex: 1,
          alignItems: 'center',
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: 0.5,
        },
        headerSubtitle: {
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.85)',
          marginTop: 4,
          fontWeight: '400',
        },
        backButton: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        backButtonText: {
          color: '#ffffff',
          fontSize: 22,
          fontWeight: '500',
        },
        contentContainer: {
          flex: 1,
          backgroundColor: selectedVariant.backgroundColor || '#F9FAFB',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: 16,
          paddingTop: 8,
        },
        scrollView: {
          flex: 1,
        },
        scrollContent: {
          padding: 8,
          paddingBottom: 40,
        },
        accordionSection: {
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 20,
          padding: 5,
        },
        darkAccordionSection: {
          backgroundColor: '#1F2937',
        },
        sectionHeader: {
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(229, 231, 235, 0.5)',
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: '700',
          color: '#111827',
        },
        darkSectionTitle: {
          color: '#ffffff',
        },
        sectionContent: {
          padding: 16,
        },
        variantContainer: {
          marginBottom: 14,
        },
        variantSpacing: {
          marginTop: 24,
        },
        variantHeader: {
          fontSize: 16,
          fontWeight: '600',
          color: selectedVariant.color,
          marginBottom: 12,
          paddingHorizontal: 4,
        },
        darkVariantHeader: {
          color: '#E5E7EB',
        },
        divider: {
          height: 1,
          backgroundColor: 'rgba(229, 231, 235, 0.7)',
          marginVertical: 24,
        },
        spacer: {
          height: 16,
        },
      }),
    [selectedVariant]
  );

  const renderAccordion = (
    type: string,
    theme: string,
    data: any[],
    defaultOpenIds: string[] = []
  ) => {
    return (
      <AccordionUnified
        data={data}
        variant={type as any}
        theme={theme}
        animationType="timing"
        animationDuration={300}
        defaultOpenIds={defaultOpenIds}
        compact={data === compactData}
      />
    );
  };

  const renderVariantAccordions = () => {
    if (variant === 'all') {
      return Object.entries(variantConfig)
        .filter(([key]) => key !== 'all')
        .map(([key, config], index) => (
          <View
            key={key}
            style={[
              styles.variantContainer,
              index > 0 && styles.variantSpacing,
            ]}
          >
            <Text
              style={[
                styles.variantHeader,
                config.isDark && styles.darkVariantHeader,
              ]}
            >
              {config.title}
            </Text>
            {renderAccordion(
              config.variant as string,
              config.theme as string,
              sampleData,
              config.defaultOpenIds || []
            )}
          </View>
        ));
    }

    return (
      <>
        <View style={styles.variantContainer}>
          <Text
            style={[
              styles.variantHeader,
              selectedVariant?.isDark && styles.darkVariantHeader,
            ]}
          >
            Standard Style
          </Text>
          {renderAccordion(
            selectedVariant.variant,
            selectedVariant.theme,
            sampleData,
            selectedVariant.defaultOpenIds || []
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.variantContainer}>
          <Text
            style={[
              styles.variantHeader,
              selectedVariant?.isDark && styles.darkVariantHeader,
            ]}
          >
            Compact Style
          </Text>
          {renderAccordion(
            selectedVariant.variant,
            selectedVariant.theme,
            compactData,
            selectedVariant.defaultOpenIds || []
          )}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={selectedVariant.color}
      />

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

      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.accordionSection,
              selectedVariant?.isDark && styles.darkAccordionSection,
            ]}
          >
            {renderVariantAccordions()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AccordionVariantDetail;
