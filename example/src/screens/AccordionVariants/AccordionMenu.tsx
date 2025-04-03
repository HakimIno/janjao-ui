import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

type AccordionNavigationProp = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

const { width, height } = Dimensions.get('window');

const getCardWidth = () => {
  const containerPadding = 16;
  const gap = 4;
  const availableWidth = width - containerPadding * 2;
  return (availableWidth - gap) / 2;
};

const getCardHeight = () => {
  const baseHeight = 375;
  const scale = height / baseHeight;
  const baseCardHeight = 160;
  const scaledHeight = Math.round(baseCardHeight * scale);

  const minHeight = 140;
  const maxHeight = height * 0.2;

  return Math.min(Math.max(scaledHeight, minHeight), maxHeight);
};

const cardWidth = getCardWidth();
const cardHeight = getCardHeight();

const getResponsiveFontSize = (baseSize: number) => {
  const scale = width / 375;
  return Math.round(baseSize * scale);
};

const AccordionMenu = () => {
  const navigation = useNavigation<AccordionNavigationProp>();
  const [activeTab, setActiveTab] = useState<'variants' | 'available'>(
    'variants'
  );

  const variants = [
    {
      id: 'shadow',
      name: 'Shadow',
      theme: 'Purple',
      color: '#4f46e5',
      description: 'Elevated card style with shadow effects',
      backgroundGradient: ['#6366f1', '#4f46e5'],
    },
    {
      id: 'bordered',
      name: 'Bordered',
      theme: 'Blue',
      color: '#1A56DB',
      description: 'Clean bordered style with defined edges',
      backgroundGradient: ['#3F83F8', '#1A56DB'],
    },
    {
      id: 'light',
      name: 'Light',
      theme: 'Green',
      color: '#e11d48',
      description: 'Subtle design with light backgrounds',
      backgroundGradient: ['#f43f5e', '#e11d48'],
    },
    {
      id: 'splitted',
      name: 'Splitted',
      theme: 'Orange',
      color: '#84cc16',
      description: 'Split section style with clear separation',
      backgroundGradient: ['#a3e635', '#84cc16'],
    },
    {
      id: 'flat',
      name: 'Flat',
      theme: 'Gray',
      color: '#4B5563',
      description: 'Modern flat design with minimal elevation',
      backgroundGradient: ['#6B7280', '#4B5563'],
    },
  ];

  const handleCardPress = (variantId: string) => {
    navigation.navigate('AccordionVariantDetail', { variant: variantId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} />
        <Text style={styles.headerSubtitle} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'variants' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('variants')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'variants' && styles.activeTabText,
            ]}
          >
            Design Variants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'available' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('available')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'available' && styles.activeTabText,
            ]}
          >
            More Options
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'variants' ? (
          <View style={styles.cardsContainer}>
            {variants.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  {
                    backgroundColor: item.backgroundGradient?.[1] || item.color,
                  },
                ]}
                onPress={() => handleCardPress(item.id)}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={{ uri: 'https://via.placeholder.com/200' }}
                  style={styles.cardBackground}
                  imageStyle={styles.cardBackgroundImage}
                >
                  <LinearGradient
                    colors={[
                      `${item.backgroundGradient?.[0] || item.color}80`,
                      item.backgroundGradient?.[1] || item.color,
                    ]}
                    style={styles.cardOverlay}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <View
                      style={[
                        styles.themeBadge,
                        { backgroundColor: `${item.color}40` },
                      ]}
                    >
                      <Text style={styles.themeText}>{item.theme}</Text>
                    </View>
                    <Text style={styles.cardDescription}>
                      {item.description}
                    </Text>
                    <View style={styles.viewButtonContainer}>
                      <Text style={styles.viewButtonText}>Explore →</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.compactSection}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('TextInputAccordionExample')}
              activeOpacity={0.9}
            >
              <ImageBackground
                source={{ uri: 'https://via.placeholder.com/200' }}
                style={styles.cardBackground}
                imageStyle={styles.cardBackgroundImage}
              >
                <LinearGradient
                  colors={['#60a5fa80', '#1d4ed8']}
                  style={styles.cardOverlay}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Text Input</Text>
                  <View
                    style={[
                      styles.themeBadge,
                      { backgroundColor: '#1d4ed840' },
                    ]}
                  >
                    <Text style={styles.themeText}>Interactive</Text>
                  </View>
                  <Text style={styles.cardDescription}>
                    Advanced input accordion style
                  </Text>
                  <View style={styles.viewButtonContainer}>
                    <Text style={styles.viewButtonText}>Explore →</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 15,
    backgroundColor: '#1e3a8a',
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginVertical: 16,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardBackgroundImage: {
    borderRadius: 16,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  themeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  themeText: {
    color: '#ffffff',
    fontSize: getResponsiveFontSize(10),
    fontWeight: '500',
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: getResponsiveFontSize(12),
    marginBottom: 6,
  },
  viewButtonContainer: {
    marginTop: 4,
  },
  viewButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: getResponsiveFontSize(12),
  },
  compactSection: {
    padding: 10,
    marginTop: 8,
  },
  compactSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a2b49',
    marginBottom: 16,
  },
  compactButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  compactButtonIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a2b49',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#1d4ed8',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: '#ffffff',
  },
});

export default AccordionMenu;
