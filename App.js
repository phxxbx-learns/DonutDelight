import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { CartProvider } from './context/CartContext';
import BottomTabNavigator from './components/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main" options={{ headerShown: false }}>
                {(props) => (
                  <BottomTabNavigator 
                    {...props} 
                    user={user} 
                    onLogout={handleLogout}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Product" options={{ headerShown: false }}>
                {(props) => <ProductScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Category" options={{ headerShown: false }}>
                {(props) => <CategoryScreen {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}