import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Alert
} from 'react-native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const CategoryScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('DONUTS');
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { addToCart } = useCart(); // Get addToCart from context

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);


  const categories = [
    { id: '1', name: 'DONUTS', count: '27 items', emoji: '🍩', color: '#FF6B8B', icon: '🌈' },
    { id: '2', name: 'DESSERTS', count: '15 items', emoji: '🍰', color: '#4ECDC4', icon: '✨' },
    { id: '3', name: 'BEVERAGES', count: '9 items', emoji: '☕', color: '#45B7D1', icon: '🌟' },
    { id: '4', name: 'PASTRIES', count: '18 items', emoji: '🥐', color: '#9966CC', icon: '🎀' },
  ];

  const allProducts = [
    // Donuts
    { 
      id: '1', 
      name: 'Chocolate Glaze Dream', 
      price: '₱78.00', 
      description: 'Rich chocolate glaze over fluffy donut', 
      category: 'DONUTS', 
      emoji: '🍫',
      rating: '⭐ 4.8',
      tags: ['Best Seller', 'Chocolate']
    },
    { 
      id: '2', 
      name: 'Strawberry Fields', 
      price: '₱82.00', 
      description: 'Fresh strawberry frosting with sprinkles', 
      category: 'DONUTS', 
      emoji: '🍓',
      rating: '⭐ 4.9',
      tags: ['Fruity', 'Colorful']
    },
    { 
      id: '3', 
      name: 'Boston Cream Pie', 
      price: '₱85.00', 
      description: 'Custard filled with chocolate topping', 
      category: 'DONUTS', 
      emoji: '⚪',
      rating: '⭐ 4.7',
      tags: ['Creamy', 'Classic']
    },
    { 
      id: '4', 
      name: 'Blueberry Bliss', 
      price: '₱79.00', 
      description: 'Blueberry infused with lemon glaze', 
      category: 'DONUTS', 
      emoji: '🫐',
      rating: '⭐ 4.6',
      tags: ['Fruity', 'Tangy']
    },
    { 
      id: '5', 
      name: 'Maple Bacon Crunch', 
      price: '₱88.00', 
      description: 'Sweet maple glaze with crispy bacon', 
      category: 'DONUTS', 
      emoji: '🥓',
      rating: '⭐ 4.5',
      tags: ['Savory', 'Crunchy']
    },
    { 
      id: '6', 
      name: 'Cinnamon Sugar Twist', 
      price: '₱72.00', 
      description: 'Cinnamon coated twisted donut', 
      category: 'DONUTS', 
      emoji: '🎀',
      rating: '⭐ 4.7',
      tags: ['Cinnamon', 'Classic']
    },
    { 
      id: '7', 
      name: 'Matcha Green Tea', 
      price: '₱85.00', 
      description: 'Premium matcha powder coating', 
      category: 'DONUTS', 
      emoji: '🍵',
      rating: '⭐ 4.8',
      tags: ['Green Tea', 'Premium']
    },
    
    // Desserts
    { 
      id: '8', 
      name: 'New York Cheesecake', 
      price: '₱125.00', 
      description: 'Creamy classic New York style slice', 
      category: 'DESSERTS', 
      emoji: '🍰',
      rating: '⭐ 4.9',
      tags: ['Creamy', 'Premium']
    },
    { 
      id: '9', 
      name: 'Chocolate Mousse Dream', 
      price: '₱95.00', 
      description: 'Rich dark chocolate mousse delight', 
      category: 'DESSERTS', 
      emoji: '🍫',
      rating: '⭐ 4.8',
      tags: ['Chocolate', 'Light']
    },
    { 
      id: '10', 
      name: 'Tiramisu Classico', 
      price: '₱110.00', 
      description: 'Traditional Italian coffee dessert', 
      category: 'DESSERTS', 
      emoji: '☕',
      rating: '⭐ 4.7',
      tags: ['Coffee', 'Elegant']
    },
    
    // Beverages
    { 
      id: '11', 
      name: 'Caramel Macchiato', 
      price: '₱120.00', 
      description: 'Espresso with caramel and steamed milk', 
      category: 'BEVERAGES', 
      emoji: '☕',
      rating: '⭐ 4.8',
      tags: ['Coffee', 'Caramel']
    },
    { 
      id: '12', 
      name: 'Strawberry Sunrise Shake', 
      price: '₱135.00', 
      description: 'Fresh strawberry milkshake with cream', 
      category: 'BEVERAGES', 
      emoji: '🍓',
      rating: '⭐ 4.9',
      tags: ['Fruity', 'Refreshing']
    },
    { 
      id: '13', 
      name: 'Matcha Green Tea Latte', 
      price: '₱115.00', 
      description: 'Premium matcha with steamed milk', 
      category: 'BEVERAGES', 
      emoji: '🍵',
      rating: '⭐ 4.7',
      tags: ['Green Tea', 'Healthy']
    },
    
    // Pastries
    { 
      id: '14', 
      name: 'Butter Croissant', 
      price: '₱65.00', 
      description: 'Flaky buttery French croissant', 
      category: 'PASTRIES', 
      emoji: '🥐',
      rating: '⭐ 4.6',
      tags: ['Buttery', 'Flaky']
    },
    { 
      id: '15', 
      name: 'Apple Cinnamon Turnover', 
      price: '₱75.00', 
      description: 'Warm apple filling with cinnamon', 
      category: 'PASTRIES', 
      emoji: '🍎',
      rating: '⭐ 4.8',
      tags: ['Fruity', 'Warm']
    },
    { 
      id: '16', 
      name: 'Chocolate Pain au Chocolat', 
      price: '₱70.00', 
      description: 'Chocolate filled French pastry', 
      category: 'PASTRIES', 
      emoji: '🍫',
      rating: '⭐ 4.7',
      tags: ['Chocolate', 'French']
    },
  ];

  const filteredProducts = allProducts.filter(product => 
    product.category === selectedCategory &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Add to Cart with beautiful feedback
  const handleAddToCart = (product) => {
    addToCart(product, 1, 'Regular');
    Alert.alert(
      '🎉 Added to Cart!',
      `${product.name} has been added to your cart!`,
      [
        {
          text: 'Keep Shopping',
          style: 'cancel'
        },
        {
          text: 'View Cart',
          onPress: () => navigation.navigate('Cart')
        }
      ]
    );
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

  const ProductCard = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.productCard,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          }],
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.productTouchable}
        onPress={() => navigation.navigate('Product', { product: item })}
      >
        <View style={styles.productHeader}>
          <View style={styles.productImage}>
            <Text style={styles.productEmoji}>{item.emoji}</Text>
            <View style={styles.productRating}>
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Background Decorations */}
      <DonutDecoration size={120} color="#FFD1DC" top={60} left={-40} rotation={15} />
      <DonutDecoration size={80} color="#FFE5B4" top={200} right={-25} rotation={-10} />
      <DonutDecoration size={100} color="#E6E6FA" bottom={400} left={-30} rotation={25} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Our Menu 🎪</Text>
            <Text style={styles.subtitle}>Discover sweet perfection in every bite</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchBar}
              placeholder="What are you craving? 🔍"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories 🎯</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: category.color },
                  selectedCategory === category.name && styles.categoryIconSelected
                ]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text style={styles.categoryDecor}>{category.icon}</Text>
                </View>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.categoryTextSelected
                ]}>
                  {category.name}
                </Text>
                <Text style={[
                  styles.categoryCount,
                  selectedCategory === category.name && styles.categoryCountSelected
                ]}>
                  {category.count}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredProducts.length} {selectedCategory.toLowerCase()}
            {filteredProducts.length !== 1 && !selectedCategory.endsWith('S') ? 's' : ''} found
          </Text>
        </View>

        {/* Products - Now inside the main ScrollView */}
        <View style={styles.productsSection}>
          {filteredProducts.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </View>

        {/* Bottom Spacer for tab bar */}
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
    borderRadius: 60,
    opacity: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutHole: {
    fontSize: 24,
    opacity: 0.4,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    opacity: 0.8,
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  filterButton: {
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
  filterIcon: {
    fontSize: 20,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 25,
    marginBottom: 15,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'white',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryButtonSelected: {
    backgroundColor: '#FF6B8B',
    transform: [{ scale: 1.05 }],
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  categoryIconSelected: {
    backgroundColor: 'white',
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryDecor: {
    position: 'absolute',
    top: -5,
    right: -5,
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryTextSelected: {
    color: 'white',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  categoryCountSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  resultsContainer: {
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  resultsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  productsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    overflow: 'hidden',
  },
  productTouchable: {
    padding: 20,
  },
  productHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FFF9F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  productEmoji: {
    fontSize: 32,
  },
  productRating: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B8B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#FFF9F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#FF6B8B',
    fontWeight: '600',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B8B',
  },
  addButton: {
    backgroundColor: '#FF6B8B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 90,
  },
});

export default CategoryScreen;