import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ user, onLogout }) => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Menu') {
              iconName = focused ? 'fast-food' : 'fast-food-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return (
              <View style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused
              ]}>
                <Ionicons name={iconName} size={22} color={color} />
                {route.name === 'Cart' && cartItemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {cartItemCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: '#FF6B8B',
          tabBarInactiveTintColor: '#999',
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Menu" component={CategoryScreen} />
        <Tab.Screen name="Cart" component={CheckoutScreen} />
        <Tab.Screen name="Profile">
          {(props) => <LoginScreen {...props} user={user} onLogout={onLogout} isProfile={true} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: 'white',
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 80,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingBottom: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
  iconContainer: {
    position: 'relative',
    padding: 8,
    borderRadius: 20,
  },
  iconContainerFocused: {
    backgroundColor: 'rgba(255, 107, 139, 0.1)',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B8B',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;