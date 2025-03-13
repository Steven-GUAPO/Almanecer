import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuantityButton = ({ item, items, setItems }) => {
  // const [quantity, setQuantity] = useState(item.quantity);
  // console.log(item)
  const updateQuantity = async (delta) => {
    // Update the quantity of the specific item
    const updatedItems = items.map((i) =>
      i.item === item.item
        ? { ...i, quantity: Math.max(i.quantity + delta, 0) }
        : i
    );
    setItems(updatedItems);

    // Update the cart in AsyncStorage
    const updatedCart = updatedItems
    .filter((i) => i.quantity > 0)
    .map((i) => ({
      image_url: i.image_url,
      _id: i._id,
      item: i.item,
      price: i.price,
      quantity: i.quantity,
   }));
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (item.quantity === 0) {
    return (
      <TouchableOpacity
        onPress={() => updateQuantity(1)}
        className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <Text className="text-lg font-bold">+</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={() => updateQuantity(-1)}
        className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <Text className="text-lg font-bold">-</Text>
      </TouchableOpacity>
      <Text className="mx-3 text-lg font-semibold">{item.quantity}</Text>
      <TouchableOpacity
        onPress={() => updateQuantity(1)}
        className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <Text className="text-lg font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantityButton;

