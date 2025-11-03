import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image
} from 'react-native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const ProductScreen = ({ navigation, route }) => {
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { addToCart } = useCart(); // Get addToCart from context

  const product = route.params?.product || {
    id: '1',
    name: 'Cappuccino',
    price: '₱100.00',
    description: 'A rich, aromatic espresso blended with perfectly steamed milk and topped with a thick layer of smooth, creamy foam. Balanced in flavor and perfect for any time of day.',
    emoji: '☕',
    category: 'BEVERAGE',
    // image: require('../assets/cappuccino.jpg')
  };

  const sizes = [
    { name: 'Small', price: '₱80.00' },
    { name: 'Medium', price: '₱100.00' },
    { name: 'Large', price: '₱120.00' }
  ];

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const selectedSizeObj = sizes.find(size => size.name === selectedSize);
    const productWithSize = {
      ...product,
      price: selectedSizeObj.price,
      size: selectedSize
    };
    
    addToCart(productWithSize, quantity, selectedSize);
    
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
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.productEmoji}>{getProductImage(product.category)}</Text>
            {/* Replace with Image when ready:
            <Image source={product.image} style={styles.productImage} resizeMode="cover" />
            */}
          </View>
          <View style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>❤️</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>
            {sizes.find(size => size.name === selectedSize)?.price || product.price}
          </Text>

          {/* Size Selection */}
          <Text style={styles.sectionTitle}>Coffee Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size.name}
                style={[
                  styles.sizeButton,
                  selectedSize === size.name && styles.sizeButtonSelected
                ]}
                onPress={() => setSelectedSize(size.name)}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSize === size.name && styles.sizeTextSelected
                ]}>
                  {size.name}
                </Text>
                <Text style={[
                  styles.sizePrice,
                  selectedSize === size.name && styles.sizePriceSelected
                ]}>
                  {size.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* About Section */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {product.description}
          </Text>
          <Text style={styles.readMore}>Read more</Text>

          <Text style={styles.volume}>Volume: 160ml</Text>
        </View>
      </ScrollView>

      {/* Buy Now Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
          <View style={styles.buttonBadge}>
            <Text style={styles.buttonBadgeText}>{quantity}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Success Message */}
      {showSuccess && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successText}>Added to Cart!</Text>
        </Animated.View>
      )}
    </View>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#FF6B8B',
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productEmoji: {
    fontSize: 120,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
    minHeight: 400,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  sizeButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sizeButtonSelected: {
    backgroundColor: '#FF6B8B',
    borderColor: '#FF6B8B',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sizeTextSelected: {
    color: 'white',
  },
  sizePrice: {
    fontSize: 14,
    color: '#666',
  },
  sizePriceSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F2',
    borderRadius: 25,
    padding: 5,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B8B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 10,
  },
  readMore: {
    fontSize: 16,
    color: '#FF6B8B',
    fontWeight: '600',
    marginBottom: 20,
  },
  volume: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  buyButton: {
    backgroundColor: '#FF6B8B',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonBadge: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBadgeText: {
    color: '#FF6B8B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  successMessage: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  successEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  successText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductScreen;