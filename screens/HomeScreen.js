import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation, user }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeBanner, setActiveBanner] = useState(0);

  const banners = [
    { 
      id: 1, 
      title: 'SWEET DEALS', 
      subtitle: 'Get 50% off on first order!', 
      color: '#FF6B8B', 
      emoji: '🎉'
    },
    { 
      id: 2, 
      title: 'NEW FLAVORS', 
      subtitle: 'Try our seasonal specials', 
      color: '#4ECDC4', 
      emoji: '🍂'
    },
    { 
      id: 3, 
      title: 'FREE DELIVERY', 
      subtitle: 'On orders above ₱500', 
      color: '#45B7D1', 
      emoji: '🚚'
    },
  ];

  const featuredProducts = [
    { 
      id: 1, 
      name: 'NUTTY FUNTASTY', 
      price: '₱35.00', 
      color: '#FFD166', 
      emoji: '🥜',
      category: 'DONUTS',
    },
    { 
      id: 2, 
      name: 'FRUITY FUNTASTY', 
      price: '₱27.00', 
      color: '#EF476F', 
      emoji: '🍓',
      category: 'DONUTS',
    },
    { 
      id: 3, 
      name: 'FESTIVE FUNTASTY', 
      price: '₱30.00', 
      color: '#118AB2', 
      emoji: '🎊',
      category: 'DONUTS',
    },
  ];

  const categories = [
    { id: 1, name: 'DONUTS', count: '27 items', emoji: '🍩', color: '#FF6B8B' },
    { id: 2, name: 'DESSERTS', count: '15 items', emoji: '🍰', color: '#4ECDC4' },
    { id: 3, name: 'BEVERAGES', count: '9 items', emoji: '☕', color: '#45B7D1' },
    { id: 4, name: 'PASTRIES', count: '18 items', emoji: '🥐', color: '#9966CC' },
  ];

  // NEW: Daily Specials
  const dailySpecials = [
    { id: 1, name: 'Morning Bliss', description: 'Coffee + Donut Combo', price: '₱99.00', emoji: '☕🍩', discount: 'Save ₱30' },
    { id: 2, name: 'Afternoon Treat', description: '2 Donuts + Milkshake', price: '₱149.00', emoji: '🍩🍩🥤', discount: 'Save ₱45' },
    { id: 3, name: 'Evening Delight', description: 'Family Pack Special', price: '₱299.00', emoji: '🍩🍩🍩🍩', discount: 'Save ₱80' },
  ];

  // NEW: Trending Now
  const trendingItems = [
    { id: 1, name: 'Matcha Madness', price: '₱42.00', emoji: '🍵', rating: '⭐ 4.9', category: 'DONUT' },
    { id: 2, name: 'Salted Caramel', price: '₱38.00', emoji: '🧂', rating: '⭐ 4.8', category: 'DONUT' },
    { id: 3, name: 'Red Velvet', price: '₱45.00', emoji: '🧁', rating: '⭐ 4.7', category: 'DONUT' },
  ];

  // NEW: Quick Actions
  const quickActions = [
    { id: 1, title: 'Track Order', icon: '🚚', color: '#FF6B8B' },
    { id: 2, title: 'Rewards', icon: '🎁', color: '#4ECDC4' },
    { id: 3, title: 'Nearby Store', icon: '📍', color: '#45B7D1' },
    { id: 4, title: 'Gift Cards', icon: '💝', color: '#9966CC' },
  ];

  const onBannerScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // Get first name only
  const getUserFirstName = () => {
    if (!user?.displayName) return 'Guest';
    return user.displayName.split(' ')[0];
  };

  // Donut decorations for background
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

  return (
    <View style={styles.container}>
      {/* Background Decorations */}
      <DonutDecoration size={100} color="#FFD1DC" top={50} left={-30} rotation={15} />
      <DonutDecoration size={70} color="#FFE5B4" top={200} right={-20} rotation={-10} />
      <DonutDecoration size={80} color="#E6E6FA" bottom={300} left={-25} rotation={25} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Hello, {getUserFirstName()}! 👋</Text>
            <Text style={styles.subGreeting}>What sweet treat are we craving today?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search donuts, drinks, pastries..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* NEW: Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions ⚡</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionCard}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Banner Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Specials 🌟</Text>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onBannerScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.bannerContentContainer}
          >
            {banners.map((banner) => (
              <View key={banner.id} style={styles.bannerWrapper}>
                <TouchableOpacity
                  style={[styles.banner, { backgroundColor: banner.color }]}
                  activeOpacity={0.9}
                >
                  <View style={styles.bannerContent}>
                    <View style={styles.bannerTextContainer}>
                      <Text style={styles.bannerTitle}>{banner.title}</Text>
                      <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                    </View>
                    <View style={styles.bannerEmojiContainer}>
                      <Text style={styles.bannerEmoji}>{banner.emoji}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.bannerDots}>
            {banners.map((_, index) => {
              const dotWidth = scrollX.interpolate({
                inputRange: [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ],
                outputRange: [8, 20, 8],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={[styles.bannerDot, { width: dotWidth }]}
                />
              );
            })}
          </View>
        </View>

        {/* Quick Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Categories 🎯</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Menu')}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Donuts 🍩</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.featuredContentContainer}
          >
            {featuredProducts.map((product, index) => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productCard,
                  { backgroundColor: product.color }
                ]}
                onPress={() => navigation.navigate('Product', { product })}
              >
                <View style={styles.productImageContainer}>
                  <Text style={styles.productEmoji}>{product.emoji}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* NEW: Daily Specials */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Combos 🎪</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dailySpecialsContainer}>
            {dailySpecials.map((special) => (
              <TouchableOpacity key={special.id} style={styles.dailySpecialCard}>
                <View style={styles.specialEmojiContainer}>
                  <Text style={styles.specialEmoji}>{special.emoji}</Text>
                </View>
                <View style={styles.specialInfo}>
                  <Text style={styles.specialName}>{special.name}</Text>
                  <Text style={styles.specialDescription}>{special.description}</Text>
                  <View style={styles.specialPriceContainer}>
                    <Text style={styles.specialPrice}>{special.price}</Text>
                    <Text style={styles.specialDiscount}>{special.discount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* NEW: Trending Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.trendingContentContainer}
          >
            {trendingItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.trendingCard}>
                <View style={styles.trendingHeader}>
                  <View style={styles.trendingEmojiContainer}>
                    <Text style={styles.trendingEmoji}>{item.emoji}</Text>
                  </View>
                  <Text style={styles.trendingRating}>{item.rating}</Text>
                </View>
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingName}>{item.name}</Text>
                  <Text style={styles.trendingCategory}>{item.category}</Text>
                  <Text style={styles.trendingPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Special Offer */}
        <View style={styles.specialOffer}>
          <View style={styles.offerContent}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>Limited Time! ⚡</Text>
            </View>
            <Text style={styles.offerTitle}>Weekend Sweet Deal! 🎉</Text>
            <Text style={styles.offerText}>Buy 2 get 1 free on all premium donuts</Text>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Claim Offer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.offerVisual}>
            <Text style={styles.offerDonut}>🍩</Text>
            <Text style={styles.offerSparkle}>✨</Text>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
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
  // Background decorations
  donutDecoration: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutHole: {
    fontSize: 20,
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationIcon: {
    fontSize: 20,
  },
  searchContainer: {
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 15,
    marginRight: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  searchButton: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#FF6B8B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  searchIcon: {
    fontSize: 20,
    color: 'white',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 25,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  seeAllText: {
    color: '#FF6B8B',
    fontWeight: '600',
    fontSize: 14,
  },
  // NEW: Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  quickActionCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    width: '23%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionEmoji: {
    fontSize: 20,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  // Banner Styles
  bannerContentContainer: {
    paddingHorizontal: 20,
  },
  bannerWrapper: {
    width: width - 40,
    marginRight: 15,
  },
  banner: {
    height: 140,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    marginLeft: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  bannerEmojiContainer: {
    marginLeft: 15,
  },
  bannerEmoji: {
    fontSize: 40,
  },
  bannerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  bannerDot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B8B',
    marginHorizontal: 4,
  },
  // Categories Grid
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    margin: '2.5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  // Featured Products
  featuredContentContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productCard: {
    width: 160,
    height: 180,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  productImageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  productEmoji: {
    fontSize: 50,
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  // NEW: Daily Specials
  dailySpecialsContainer: {
    paddingHorizontal: 20,
  },
  dailySpecialCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  specialEmojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF9F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  specialEmoji: {
    fontSize: 20,
  },
  specialInfo: {
    flex: 1,
  },
  specialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  specialPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginRight: 10,
  },
  specialDiscount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  // NEW: Trending Now
  trendingContentContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  trendingCard: {
    backgroundColor: 'white',
    width: 140,
    padding: 15,
    borderRadius: 15,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendingEmojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingEmoji: {
    fontSize: 18,
  },
  trendingRating: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  trendingInfo: {
    alignItems: 'flex-start',
  },
  trendingName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  trendingCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B8B',
  },
  // Special Offer
  specialOffer: {
    backgroundColor: '#FF6B8B',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    marginBottom: 10,
  },
  offerContent: {
    flex: 1,
  },
  offerBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  offerBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  offerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
    lineHeight: 20,
  },
  offerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    color: '#FF6B8B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  offerVisual: {
    alignItems: 'center',
    marginLeft: 15,
  },
  offerDonut: {
    fontSize: 50,
  },
  offerSparkle: {
    fontSize: 20,
    marginTop: 5,
  },
  bottomSpacer: {
    height: 110,
  },
});

export default HomeScreen;