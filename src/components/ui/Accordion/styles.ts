import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  accordionContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  container: {
    marginHorizontal: 4,
    marginVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  // Modern variant styles
  modernContainer: {
    marginVertical: 8,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.12,
  },
  modernTitleContainer: {
    borderBottomWidth: 0,
  },
  // Neumorphic variant
  neumorphicContainer: {
    marginVertical: 8,
    borderRadius: 16,
  },
  neumorphicTitleContainer: {
    borderBottomWidth: 0,
  },
  // Glassmorphism variant
  glassmorphicContainer: {
    marginVertical: 8,
    borderRadius: 16,
  },
  glassmorphicTitleContainer: {
    borderBottomWidth: 0,
  },
  // iOS variant
  iosContainer: {
    marginVertical: 6,
    borderRadius: 10,
  },
  iosTitleContainer: {
    borderBottomWidth: 0,
  },
  // Material variant
  materialContainer: {
    marginVertical: 4,
    borderRadius: 8,
  },
  materialTitleContainer: {
    borderBottomWidth: 0,
  },
  // Nested styles
  nestedContainer: {
    marginVertical: 4,
    borderRadius: 8,
    paddingLeft: 12,
    marginLeft: 0,
    backgroundColor: 'transparent',
  },
  compactContainer: {
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  // Title styles
  textTitle: {
    fontSize: 16,
    flex: 1,
    letterSpacing: 0.1,
    fontWeight: '600',
    color: '#1F2937',
  },
  compactTitle: {
    fontSize: 14,
    letterSpacing: 0.05,
  },
  titleContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  nestedTitleContainer: {
    paddingVertical: 12,
    paddingLeft: 24,
    backgroundColor: 'transparent',
  },
  compactTitleContainer: {
    padding: 12,
    backgroundColor: 'transparent',
  },
  flatTitleContainer: {
    paddingHorizontal: 0,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  // Content styles
  contentContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    padding: 16,
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: 20,
  },
  splittedContent: {
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: 'transparent',
  },
  textContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  // Icon styles
  iconContainer: {
    marginRight: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 6,
  },
  // Updated chevron styles
  modernChevronContainer: {
    backgroundColor: 'transparent',
  },
  neumorphicChevronContainer: {
    backgroundColor: 'transparent',
  },
  glassmorphicChevronContainer: {
    backgroundColor: 'transparent',
  },
  // Nested indicators
  nestedIndicator: {
    position: 'absolute',
    width: 2,
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  levelIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  flatNestedTitleContainer: {
    paddingLeft: 16,
    backgroundColor: 'transparent',
  },
  flatNestedIndicator: {
    position: 'absolute',
    width: 1,
    top: 0,
    height: '100%',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  flatLevelIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  // Row styles for badge alignment
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  // New styles for modern badges
  modernBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 0,
  },
  pillBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export const getResponsiveStyles = (width: number) => {
  const isSmallScreen = width < 375;
  const isMediumScreen = width >= 375 && width < 768;

  return {
    accordionContainer: {
      paddingHorizontal: isSmallScreen ? 4 : isMediumScreen ? 8 : 12,
    },
    container: {
      marginVertical: isSmallScreen ? 4 : isMediumScreen ? 6 : 8,
      borderRadius: isSmallScreen ? 10 : isMediumScreen ? 14 : 18,
    },
    titleContainer: {
      padding: isSmallScreen ? 12 : isMediumScreen ? 16 : 20,
    },
    textTitle: {
      fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
      letterSpacing: isSmallScreen ? 0.05 : isMediumScreen ? 0.1 : 0.15,
    },
    content: {
      padding: isSmallScreen ? 12 : isMediumScreen ? 16 : 20,
    },
    textContent: {
      fontSize: isSmallScreen ? 13 : isMediumScreen ? 14 : 15,
      lineHeight: isSmallScreen ? 20 : isMediumScreen ? 22 : 24,
    },
    chevronContainer: {
      width: isSmallScreen ? 22 : isMediumScreen ? 26 : 30,
      height: isSmallScreen ? 22 : isMediumScreen ? 26 : 30,
    },
  };
};
