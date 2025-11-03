import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { useCart } from '../context/CartContext';

const CheckoutScreen = ({ navigation }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { cartItems, updateCartItem, removeFromCart, clearCart } = useCart(); // Get cart functions from context

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₱', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
    
    const shipping = subtotal > 0 ? 8.00 : 0;
    const discount = promoCode === 'SWEET20' ? subtotal * 0.2 : 0;
    const total = subtotal + shipping - discount;
    
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const totals = calculateTotals();

  const applyPromoCode = () => {
    if (promoCode === 'SWEET20') {
      Alert.alert('Success!', '20% discount applied! 🎉');
    } else if (promoCode) {
      Alert.alert('Invalid Code', 'This promo code is not valid.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Add some delicious items to your cart first! 🍩');
      return;
    }

    setIsCheckingOut(true);
    Alert.alert(
      'Order Confirmed!',
      `Your order of ₱${totals.total} has been placed successfully! 🎉\n\nYour donuts will be ready in 15-20 minutes.`,
      [
        {
          text: 'Awesome!',
          onPress: () => {
            clearCart();
            setIsCheckingOut(false);
          }
        }
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImage}>
        <Text style={styles.itemEmoji}>{item.emoji}</Text>
        {/* Replace with Image when ready:
        <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
        */}
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>Size: {item.size}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateCartItem(item.cartId, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateCartItem(item.cartId, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.cartId)}
      >
        <Text style={styles.removeButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Add some delicious donuts to get started!</Text>
        <TouchableOpacity 
          style={styles.shopButton} 
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.shopButtonText}>Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Cart Items */}
        <View style={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <View key={item.cartId}>
              {renderCartItem({ item })}
            </View>
          ))}
        </View>

        {/* Promo Code Section */}
        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Add Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.applyButton} onPress={applyPromoCode}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.promoHint}>Try: SWEET20 for 20% off!</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₱{totals.subtotal}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {totals.shipping === '0.00' ? 'FREE' : `₱${totals.shipping}`}
            </Text>
          </View>
          
          {totals.discount !== '0.00' && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.discountText]}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountText]}>-₱{totals.discount}</Text>
            </View>
          )}
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₱{totals.total}</Text>
          </View>
        </View>

        {/* Bottom Spacer for the checkout button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Checkout Button - Fixed at bottom but higher */}
      <View style={styles.checkoutSection}>
        <TouchableOpacity 
          style={[
            styles.checkoutButton,
            isCheckingOut && styles.checkoutButtonDisabled
          ]} 
          onPress={handleCheckout}
          disabled={isCheckingOut}
        >
          <Text style={styles.checkoutButtonText}>
            {isCheckingOut ? 'Processing...' : `Checkout`}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.deliveryText}>
          🚚 Free delivery on orders over ₱500
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
    paddingTop: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  cartItemsContainer: {
    paddingHorizontal: 20,
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FF6B8B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemEmoji: {
    fontSize: 24,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B8B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 18,
  },
  promoSection: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  promoContainer: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#FFF9F2',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#FF6B8B',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  promoHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  summaryContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  discountText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B8B',
  },
  checkoutSection: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#FFF9F2',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginBottom: 70,
  },
  checkoutButton: {
    backgroundColor: '#FF6B8B',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#CCC',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  secureText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  deliveryText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  shopButton: {
    backgroundColor: '#FF6B8B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default CheckoutScreen;