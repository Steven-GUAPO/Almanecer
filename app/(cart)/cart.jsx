import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuantityButton from "../../components/QuantityButton";
import { useNavigation } from "@react-navigation/native";
import { Redirect, router } from 'expo-router';

import { CustomButton } from '../../components';

const Cart = () => {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch cart from AsyncStorage
    const fetchCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Error fetching cart from storage:", error);
      }
    };
    fetchCart();
  }, []);

  // Update AsyncStorage whenever cart updates
  useEffect(() => {
    const saveCart = async () => {
      try {
        // console.log(cart)
        const filteredcart = cart.filter(item => item.quantity > 0);
        // setCart(filteredcart)
        await AsyncStorage.setItem("cart", JSON.stringify(filteredcart));
      } catch (error) {
        console.error("Error saving cart to storage:", error);
      }
    };
    saveCart();
  }, [cart]);

  // Update quantity in cart
  const updateQuantity = async (cart) => {
    setCart(cart.filter((cartItem) => cartItem.quantity > 0)); // Remove items with 0 quantity
  };

  // Calculate cart summary
  const calculateSummary = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = 1.99; // Static value
    const serviceFee = 0.15 * subtotal; // Static value
    const tax = subtotal * 0.095; // Example 5% tax
    const total = subtotal + deliveryFee + serviceFee + tax;
    return { subtotal, deliveryFee, serviceFee, tax, total };
  };
  // const subtotal = 0, deliveryFee = 0, serviceFee = 0, tax = 0, total = 0 ;

  const { subtotal = 0, deliveryFee = 0, serviceFee = 0, tax = 0, total = 0 } =
    calculateSummary();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.replace("/menu")}>
          <Text className="text-lg font-bold">×</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Your Cart</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.item}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center px-4 py-4 border-b border-gray-300">
            <Image
              source={{ uri: item.image_url }}
              className="w-20 h-20 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-semibold text-black">
                {item.item}
              </Text>
              <Text className="text-sm text-gray-500">
                ${item.price.toFixed(2)}
              </Text>
            </View>
            <QuantityButton item={item} items={cart} setItems={updateQuantity}/>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500 mt-10">
            Your cart is empty
          </Text>
        )}
      />

      {/* Summary */}
      {cart.length > 0 && (
        <View className="p-4">
          <View className="mt-4">
            <Text className="text-lg font-semibold text-black mb-2">
              Summary
            </Text>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700">Subtotal</Text>
              <Text className="text-gray-700">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700">Delivery Fee</Text>
              <Text className="text-gray-700">${deliveryFee.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700">Service Fee</Text>
              <Text className="text-gray-700">${serviceFee.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-700">Estimated Tax</Text>
              <Text className="text-gray-700">${tax.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center border-t border-gray-300 pt-4">
              <Text className="text-lg font-semibold text-black">Total</Text>
              <Text className="text-lg font-semibold text-black">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
        <CustomButton
          title="Continue"
          handlePress={() =>
            router.push({
              pathname: "/checkout",
              params: {
                subtotal: subtotal.toFixed(2),
                deliveryFee: deliveryFee.toFixed(2),
                serviceFee: serviceFee.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2),
                cart: encodeURIComponent(JSON.stringify(cart))
              },
            })
          }         
          containerStyles="mt-7 mb-4"
        />
      )}
    </SafeAreaView>
  );
};

export default Cart;
