import { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Checkbox, TodoCheckbox } from '../../../../src/components/ui';

const CheckBoxScreen = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Calculate responsive sizes based on screen dimensions
  const getResponsiveSize = useCallback(
    (size: number) => {
      const scale = Math.min(screenWidth, screenHeight) / 375; // Base scale on iPhone 8 width
      return Math.round(size * scale);
    },
    [screenWidth, screenHeight]
  );

  const responsiveStyles = useMemo(() => {
    return StyleSheet.create({
      container: {
        paddingHorizontal: getResponsiveSize(16),
        paddingTop: getResponsiveSize(50),
      },
      header: {
        marginBottom: getResponsiveSize(5),
      },
      welcome: {
        fontSize: getResponsiveSize(14),
      },
      name: {
        fontSize: getResponsiveSize(28),
      },
      sectionTitle: {
        fontSize: getResponsiveSize(18),
        marginBottom: getResponsiveSize(10),
      },
      shapeLabel: {
        fontSize: getResponsiveSize(14),
        marginTop: getResponsiveSize(8),
      },
      searchBar: {
        marginTop: getResponsiveSize(20),
        marginBottom: getResponsiveSize(20),
        padding: getResponsiveSize(8),
        borderRadius: getResponsiveSize(10),
      },
      hotspotButton: {
        paddingVertical: getResponsiveSize(6),
        paddingHorizontal: getResponsiveSize(12),
        borderRadius: getResponsiveSize(10),
      },
    });
  }, [getResponsiveSize]);

  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      text: 'Custom Checkbox with Pressable Component',
      completed: true,
      shape: 'round',
      withShadow: true,
    },
    {
      id: 2,
      text: 'Custom Disabled Checkbox Example',
      completed: false,
      disabled: true,
      shape: 'round',
    },
    {
      id: 3,
      text: 'Call my mom 😇',
      completed: false,
      emoji: '😇',
      shape: 'round',
    },
    {
      id: 4,
      text: 'Get groceries',
      completed: true,
      shape: 'square',
      withShadow: true,
    },
    {
      id: 5,
      text: 'Pay the bills',
      completed: true,
      shape: 'square',
      borderRadius: 2,
    },
    {
      id: 6,
      text: 'Buy tickets for concert',
      completed: false,
      emoji: '🎸 🎟️',
      shape: 'round',
      withShadow: true,
    },
    {
      id: 7,
      text: 'Try new gym routine',
      completed: false,
      shape: 'square',
      borderRadius: 8,
      withShadow: true,
    },
  ]);

  const toggleTodo = (id: number) => {
    setTodoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const [isChecked, setIsChecked] = useState(false);

  // เพิ่ม state สำหรับ checkbox ในส่วน shapes
  const [shapesChecked, setShapesChecked] = useState({
    round: true,
    square: true,
    rounded: true,
  });

  // ฟังก์ชันสำหรับเปลี่ยนสถานะ checkbox
  const toggleShape = (shape: 'round' | 'square' | 'rounded') => {
    setShapesChecked((prev) => ({
      ...prev,
      [shape]: !prev[shape],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* <LinearGradient colors={['rgba(125, 211, 252, 0.4)', 'rgba(254, 205, 211, 0.5)']} style={[styles.gradient]}> */}

      <View style={[{ flex: 1 }, responsiveStyles.container]}>
        <View style={[styles.header, responsiveStyles.header]}>
          <Text style={[styles.welcome, responsiveStyles.welcome]}>
            Welcome
          </Text>
          <Text style={[styles.name, responsiveStyles.name]}>Janjao UI</Text>
        </View>

        {/* <Animated.Image
          source={require('../../../assets/bg-orb.png')}
          style={styles.bgOrb}
          blurRadius={100}
        /> */}

        <View style={styles.section}>
          {todoItems.map((item) => (
            <TodoCheckbox
              key={item.id}
              text={item.text}
              controlled
              completed={item.completed}
              checkedColor={'#2563eb'}
              disabled={item.disabled}
              emoji={item.emoji}
              shape={item.shape as 'round' | 'square'}
              borderRadius={item.borderRadius}
              withShadow={item.withShadow}
              onToggle={() => toggleTodo(item.id)}
              size={getResponsiveSize(24)}
              textStyle={{ fontSize: getResponsiveSize(14), color: '#fff' }}
            />
          ))}
        </View>

        <View style={[styles.section, { paddingHorizontal: 10 }]}>
          <Text style={[styles.sectionTitle, responsiveStyles.sectionTitle]}>
            Checkbox Shapes
          </Text>
          <View style={[styles.shapesContainer]}>
            <View
              style={[
                styles.shapeItem,
                screenWidth <= 360 && { marginVertical: getResponsiveSize(10) },
              ]}
            >
              <Checkbox
                shape="round"
                checkedColor="#2563eb"
                controlled
                checked={shapesChecked.round}
                onPress={() => toggleShape('round')}
                size={getResponsiveSize(28)}
              />
              <Text style={[styles.shapeLabel, responsiveStyles.shapeLabel]}>
                Round
              </Text>
            </View>
            <View
              style={[
                styles.shapeItem,
                screenWidth <= 360 && { marginVertical: getResponsiveSize(10) },
              ]}
            >
              <Checkbox
                shape="square"
                checkedColor="#f43f5e"
                controlled
                checked={shapesChecked.square}
                onPress={() => toggleShape('square')}
                size={getResponsiveSize(28)}
                borderRadius={0}
              />
              <Text style={[styles.shapeLabel, responsiveStyles.shapeLabel]}>
                Square
              </Text>
            </View>
            <View
              style={[
                styles.shapeItem,
                screenWidth <= 360 && { marginVertical: getResponsiveSize(10) },
              ]}
            >
              <Checkbox
                shape="square"
                checkedColor="#22c55e"
                controlled
                checked={shapesChecked.rounded}
                onPress={() => toggleShape('rounded')}
                size={getResponsiveSize(28)}
                borderRadius={8}
              />
              <Text style={[styles.shapeLabel, responsiveStyles.shapeLabel]}>
                Rounded
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.searchBar, responsiveStyles.searchBar]}>
          <View style={[styles.searchBarContent]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                shape="round"
                checkedColor="#f43f5e"
                controlled
                checked={isChecked}
                onPress={(newValue) => setIsChecked(newValue)}
                size={getResponsiveSize(24)}
              />
              <Text
                style={[
                  styles.searchText,
                  { marginLeft: getResponsiveSize(8) },
                ]}
              >
                What are you looking for?
              </Text>
            </View>
            <View
              style={[styles.hotspotButton, responsiveStyles.hotspotButton]}
            >
              <Text style={styles.hotspotText}>Hotspot</Text>
            </View>
          </View>
        </View>
      </View>
      {/* </LinearGradient> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 10,
  },
  welcome: {
    fontSize: 16,
    color: '#a3a3a3',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  bgOrb: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
    zIndex: -1,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  shapesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  shapeItem: {
    alignItems: 'center',
  },
  shapeLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
  },
  stylesContainer: {
    marginVertical: 10,
  },
  styleGroup: {
    marginVertical: 5,
  },
  searchBar: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 40,
  },
  searchBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f43f5e',
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
    color: '#888888',
  },
  hotspotButton: {
    backgroundColor: '#f43f5e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  hotspotText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  variantsSpacer: {
    height: 10,
  },
});

export default CheckBoxScreen;
