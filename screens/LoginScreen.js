import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation, onLogin, user, onLogout, isProfile = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Oops!', 'Please fill in all fields 🍩');
      return;
    }

    const userData = {
      name: email.split('@')[0],
      email: email,
      displayName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    };

    onLogin(userData);
  };

  // Donut decorations component
  const DonutDecoration = ({ size, color, top, left, right, bottom, rotation }) => (
    <View style={[
      styles.donutDecoration,
      {
        width: size,
        height: size,
        backgroundColor: color,
        top,
        left,
        right,
        bottom,
        transform: [{ rotate: `${rotation}deg` }]
      }
    ]}>
      <Text style={styles.donutHole}>⭕</Text>
    </View>
  );

  if (isProfile && user) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <View style={styles.crownIcon}>
              <Text>👑</Text>
            </View>
          </View>
          <Text style={styles.welcomeText}>Hello, {user.displayName}!</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text>👤</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user.displayName}</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text>📧</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text>📱</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoValue}>@{user.name}</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text>🎯</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>October 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text>🍩</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Favorite Donut</Text>
              <Text style={styles.infoValue}>Chocolate Glazed</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text>📍</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Delivery Address</Text>
              <Text style={styles.infoValue}>123 Sweet Street, Donut City</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background Decorations */}
      <DonutDecoration size={120} color="#FFD1DC" top={-30} left={-30} rotation={15} />
      <DonutDecoration size={80} color="#FFE5B4" top={height * 0.1} right={-20} rotation={-10} />
      <DonutDecoration size={100} color="#E6E6FA" bottom={height * 0.3} left={-25} rotation={25} />
      <DonutDecoration size={60} color="#FFB6C1" bottom={height * 0.1} right={-15} rotation={-15} />
      
      {/* Floating mini donuts */}
      <View style={[styles.floatingDonut, { top: height * 0.15, left: width * 0.7 }]}>
        <Text style={styles.floatingEmoji}>🍩</Text>
      </View>
      <View style={[styles.floatingDonut, { top: height * 0.4, left: width * 0.1 }]}>
        <Text style={styles.floatingEmoji}>🎂</Text>
      </View>
      <View style={[styles.floatingDonut, { top: height * 0.7, left: width * 0.8 }]}>
        <Text style={styles.floatingEmoji}>☕</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[
          styles.header, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <View style={styles.mainDonut}>
            <Text style={styles.mainDonutEmoji}>🍩</Text>
            <View style={styles.glowEffect} />
          </View>
          
          <Text style={styles.title}>WELCOME TO{'\n'}DONUT DELIGHT!</Text>
          <Text style={styles.subtitle}>Where every bite is a moment of happiness</Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚚</Text>
              <Text style={styles.featureText}>Fast Delivery</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⭐</Text>
              <Text style={styles.featureText}>Premium Quality</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎁</Text>
              <Text style={styles.featureText}>Sweet Rewards</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[
          styles.form,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>
              {isSignUp ? 'Create Your Account' : 'Welcome Back!'}
            </Text>
            <Text style={styles.formSubtitle}>
              {isSignUp ? 'Join our sweet community' : 'Continue your delicious journey'}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleAuth}>
            <Text style={styles.signUpButtonText}>
              {isSignUp ? 'Create Sweet Account' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
              <View style={styles.socialIconContainer}>
                <Text style={styles.socialIcon}>f</Text>
              </View>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialButton, styles.twitterButton]}>
              <View style={styles.socialIconContainer}>
                <Text style={styles.socialIcon}>𝕏</Text>
              </View>
              <Text style={styles.socialButtonText}>X (Twitter)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>🎉 Join Donut Delight & Get:</Text>
            <View style={styles.benefitsList}>
              <Text style={styles.benefitItem}>• 20% off your first order</Text>
              <Text style={styles.benefitItem}>• Free delivery on orders over ₱500</Text>
              <Text style={styles.benefitItem}>• Exclusive member-only deals</Text>
              <Text style={styles.benefitItem}>• Early access to new flavors</Text>
            </View>
          </View>

          <Text style={styles.termsText}>
            By signing up you agree with our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>

          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <Text style={styles.switchLink}>{isSignUp ? 'Log In' : 'Sign Up Now!'}</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  // Background decorations
  donutDecoration: {
    position: 'absolute',
    borderRadius: 60,
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutHole: {
    fontSize: 24,
    opacity: 0.5,
  },
  floatingDonut: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  floatingEmoji: {
    fontSize: 24,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  mainDonut: {
    position: 'relative',
    marginBottom: 20,
  },
  mainDonutEmoji: {
    fontSize: 80,
    zIndex: 2,
  },
  glowEffect: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF6B8B',
    opacity: 0.1,
    top: -10,
    left: -10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  form: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#FFF9F2',
    padding: 18,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    fontSize: 16,
    color: '#333',
  },
  signUpButton: {
    backgroundColor: '#FF6B8B',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonIcon: {
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#999',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  twitterButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  socialIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1877F2',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  benefitsContainer: {
    backgroundColor: '#FFF9F2',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginBottom: 10,
  },
  benefitsList: {
    marginLeft: 10,
  },
  benefitItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 16,
  },
  linkText: {
    color: '#FF6B8B',
    fontWeight: '600',
  },
  switchContainer: {
    alignItems: 'center',
  },
  switchText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  switchLink: {
    color: '#FF6B8B',
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#FF6B8B',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B8B',
  },
  crownIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  profileSection: {
    padding: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIcon: {
    marginRight: 15,
    width: 40,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF6B8B',
    margin: 25,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;