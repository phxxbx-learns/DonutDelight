import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const ProductScreen = ({ navigation, route }) => {
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const { addToCart } = useCart();

  const product = route.params?.product || {
    id: '1',
    name: 'Cappuccino',
    price: '₱100.00',
    description: 'A rich, aromatic espresso blended with perfectly steamed milk and topped with a thick layer of smooth, creamy foam. Balanced in flavor and perfect for any time of day.',
    emoji: '☕',
    category: 'BEVERAGE',
    rating: '⭐ 4.8',
    tags: ['Popular', 'Creamy', 'Aromatic']
  };

  const sizes = [
    { name: 'Small', price: '₱80.00', description: '12oz' },
    { name: 'Medium', price: '₱100.00', description: '16oz' },
    { name: 'Large', price: '₱120.00', description: '20oz' }
  ];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    
    try {
      const selectedSizeObj = sizes.find(size => size.name === selectedSize);
      
      // Create a simple cart item without complex nested properties
      const cartItem = {
        cartId: `${product.id}-${selectedSize}-${Date.now()}`, // Unique ID
        id: product.id,
        name: product.name,
        price: selectedSizeObj?.price || product.price,
        quantity: quantity,
        size: selectedSize,
        emoji: product.emoji || '🍩',
        // Only include simple properties, avoid complex nested objects
      };
  
      console.log('Adding cart item:', cartItem);
      
      if (addToCart) {
        addToCart(cartItem);
        
        // Show success animation
        setShowSuccess(true);
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(1500),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowSuccess(false);
        });
      } else {
        Alert.alert('Error', 'Cart functionality not available');
      }
      
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  const getProductBackground = (category) => {
    switch(category) {
      case 'BEVERAGE': return '#FF6B8B';
      case 'DONUTS': return '#4ECDC4';
      case 'DESSERT': return '#9966CC';
      case 'PASTRIES': return '#FFB74D';
      default: return '#FF6B8B';
    }
  };

  const getProductImage = (category) => {
    switch(category) {
      case 'BEVERAGE': return '☕';
      case 'DONUTS': return '🍩';
      case 'DESSERT': return '🍰';
      case 'PASTRIES': return '🥐';
      default: return '🍩';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonInner}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Product Details</Text>
          <Text style={styles.headerSubtitle}>Sweet perfection awaits</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Product Section */}
        <Animated.View 
          style={[
            styles.heroSection,
            { 
              backgroundColor: getProductBackground(product.category),
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Space for Product Image - Replace this section with your image */}
          <View style={styles.imageContainer}>
            {/* CURRENT: Using emoji as placeholder */}
            <View style={styles.emojiContainer}>
              <Text style={styles.productEmoji}>{getProductImage(product.category)}</Text>
              <View style={styles.emojiGlow} />
            </View>
            
            {/* TODO: Replace with actual image */}
            {/* 
            <Image 
              source={{ uri: product.imageUrl }} 
              style={styles.productImage}
              resizeMode="cover"
            />
            */}
          </View>
          
          <View style={styles.floatingElements}>
            <View style={[styles.floatingElement, styles.floating1]}>
              <Text style={styles.floatingEmoji}>✨</Text>
            </View>
            <View style={[styles.floatingElement, styles.floating2]}>
              <Text style={styles.floatingEmoji}>🌟</Text>
            </View>
            <View style={[styles.floatingElement, styles.floating3]}>
              <Text style={styles.floatingEmoji}>🎀</Text>
            </View>
          </View>
          
          {/* Quick Info Overlay */}
          <View style={styles.quickInfo}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Product Details Card */}
        <Animated.View 
          style={[
            styles.detailsCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>
              {sizes.find(size => size.name === selectedSize)?.price || product.price}
            </Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {product.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Size Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Your Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.name}
                  style={[
                    styles.sizeCard,
                    selectedSize === size.name && styles.sizeCardSelected
                  ]}
                  onPress={() => setSelectedSize(size.name)}
                >
                  <View style={[
                    styles.sizeIcon,
                    selectedSize === size.name && styles.sizeIconSelected
                  ]}>
                    <Text style={[
                      styles.sizeEmoji,
                      selectedSize === size.name && styles.sizeEmojiSelected
                    ]}>
                      {size.name === 'Small' ? 'S' : size.name === 'Medium' ? 'M' : 'L'}
                    </Text>
                  </View>
                  <Text style={[
                    styles.sizeName,
                    selectedSize === size.name && styles.sizeNameSelected
                  ]}>
                    {size.name}
                  </Text>
                  <Text style={[
                    styles.sizePrice,
                    selectedSize === size.name && styles.sizePriceSelected
                  ]}>
                    {size.price}
                  </Text>
                  <Text style={[
                    styles.sizeDescription,
                    selectedSize === size.name && styles.sizeDescriptionSelected
                  ]}>
                    {size.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityCard}>
              <View style={styles.quantityInfo}>
                <Text style={styles.quantityLabel}>How many would you like?</Text>
                <Text style={styles.quantitySubtitle}>Perfect for sharing or treating yourself</Text>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={styles.quantityButton} 
                  onPress={decreaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityText}>{quantity}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.quantityButton} 
                  onPress={increaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Delight</Text>
            <View style={styles.descriptionCard}>
              <Text style={styles.description}>
                {product.description}
              </Text>
              <View style={styles.descriptionFeatures}>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🔥</Text>
                  <Text style={styles.featureText}>Freshly Made</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>⭐</Text>
                  <Text style={styles.featureText}>Premium Quality</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🚚</Text>
                  <Text style={styles.featureText}>Fast Delivery</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Sticky Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={handleAddToCart}
        >
          <View style={styles.buttonContent}>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
              <Text style={styles.buttonSubtext}>• Free delivery available</Text>
            </View>
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityBadgeText}>{quantity}</Text>
            </View>
            <View style={styles.buttonPrice}>
              <Text style={styles.buttonPriceText}>
                {sizes.find(size => size.name === selectedSize)?.price || product.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Success Message */}
      {showSuccess && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <View style={styles.successContent}>
            <Text style={styles.successEmoji}>🎉</Text>
            <View style={styles.successTextContainer}>
              <Text style={styles.successText}>Added to Cart!</Text>
              <Text style={styles.successSubtext}>Your delicious treat is waiting</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 35, // Added space for status bar
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  backButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 60, // Added padding to push content below header
  },
  imageContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    // This container is ready for your image
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // Add your image styles here
  },
  emojiContainer: {
    position: 'relative',
    // This will be replaced with your image
  },
  productEmoji: {
    fontSize: 140,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  emojiGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    top: -10,
    left: -10,
  },
  floatingElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  floating1: { top: 80, left: 30 },
  floating2: { top: 130, right: 40 },
  floating3: { bottom: 100, left: 50 },
  floatingEmoji: {
    fontSize: 16,
  },
  quickInfo: {
    position: 'absolute',
    top: 70, // Adjusted for new header position
    right: 20,
    alignItems: 'flex-end',
    gap: 8,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryTag: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsCard: {
    backgroundColor: 'white',
    marginTop: -30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
    minHeight: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  productHeader: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B8B',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    gap: 8,
  },
  tag: {
    backgroundColor: '#FFF9F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 12,
    color: '#FF6B8B',
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  sizeCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 120,
  },
  sizeCardSelected: {
    backgroundColor: '#FF6B8B',
    borderColor: '#FF6B8B',
    transform: [{ scale: 1.05 }],
  },
  sizeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF9F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sizeIconSelected: {
    backgroundColor: 'white',
  },
  sizeEmoji: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sizeEmojiSelected: {
    color: '#FF6B8B',
  },
  sizeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sizeNameSelected: {
    color: 'white',
  },
  sizePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginBottom: 4,
  },
  sizePriceSelected: {
    color: 'white',
  },
  sizeDescription: {
    fontSize: 12,
    color: '#666',
  },
  sizeDescriptionSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  quantityCard: {
    backgroundColor: '#FFF9F2',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityInfo: {
    flex: 1,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  quantitySubtitle: {
    fontSize: 12,
    color: '#666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B8B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    paddingHorizontal: 20,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: '#FFF9F2',
    padding: 20,
    borderRadius: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  descriptionFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  feature: {
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
  bottomSpacer: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF6B8B',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTextContainer: {
    flex: 1,
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  quantityBadge: {
    backgroundColor: 'white',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  quantityBadgeText: {
    color: '#FF6B8B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonPrice: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  buttonPriceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -120 }],
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    padding: 25,
    borderRadius: 20,
    width: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  successContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  successTextContainer: {
    flex: 1,
  },
  successText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  successSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
});

export default ProductScreen;