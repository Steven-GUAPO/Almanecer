import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import QuantityButton from '../../components/QuantityButton';
import { CustomButton } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Redirect, router } from 'expo-router';
import ItemDetailsModal from '../../Modals/ItemDetailsModal';
import { getMenuItems } from '../../backend/menu';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { user, setUser, setIsLogged } = useGlobalContext();

  // Animation value for the modal position
  const translateY = useSharedValue(0);

  useEffect(() => {
    if(items.length === 0) fetchData();
    if (selectedItem) {
      const updatedItem = items.find((i) => i._id === selectedItem._id);
      if (updatedItem) {
        setSelectedItem(updatedItem);
      }
    }
  }, [items]);

  const fetchData = async () => {
    try {
      const response = await getMenuItems();

      // Retrieve the cart from cache
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];
      // console.log("cart "+JSON.stringify(cart))
      const itemsWithQuantity = response.map((item) => {
        const cartItem = cart.find((cartItem) => cartItem._id === item._id); // Match by id
        return {
          ...item,
          quantity: cartItem ? cartItem.quantity : 0, // Use cart quantity if exists, otherwise 0
        };
      });
      setItems(itemsWithQuantity);

      // Set the initial category to the first available category
      const uniqueCategories = [...new Set(itemsWithQuantity.map(item => item.category))];
      if (uniqueCategories.length > 0) {
        setSelectedCategory(uniqueCategories[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Open modal and set selected item
  const openModal = (item) => {
    translateY.value = withSpring(0);
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setItems(items)
    setSelectedItem(null);
  };

  // Swipe gesture handler
  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationY > 0) {
      translateY.value = withSpring(event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = (event) => {
    if (event.nativeEvent.translationY > 400) {
      closeModal();
    } else {
      translateY.value = withSpring(0); // Snap back to full height if not swiped down enough
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Get unique categories from items
  const categories = [...new Set(items.map(item => item.category))];

  // Filter items based on selected category
  const filteredItems = items.filter(item => item.category === selectedCategory);

  // Calculate total items and cost for the cart
  const cart = items.filter(item => item.quantity > 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);


  return (
    <SafeAreaView className="bg-primary flex-1 px-4">

      {/* Categories Scroll */}
      {categories.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
          <View className="flex-row h-10 items-center">
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(category)}
                className="px-4 items-center"
              >
                <Text
                  className={`text-lg ${
                    selectedCategory === category ? 'font-bold text-black' : 'text-white'
                  }`}
                >
                  {category}
                </Text>
                {selectedCategory === category && (
                  <View className="h-1 w-full bg-black mt-1 rounded-full"></View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Item List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.item}
        contentContainerStyle={{ paddingBottom: 20}}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)} className="flex-row items-center bg-white border border-gray-100 rounded-3xl p-4 mb-4 shadow-sm">
            <Image
              source={{ uri: item.image_url }}
              className="w-20 h-full rounded-lg"
              resizeMode="contain"
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-semibold text-black">{item.item}</Text>
              <Text className="text-sm text-gray-600" numberOfLines={2}>{item.description}</Text>
              <Text className="text-md text-black mt-2">${item.price}</Text>
              <Text className="text-sm text-gray-500">Calories: {item.calories}</Text>
              <Text className="text-sm text-gray-500">Rating: {calculateAverageRating(item.ratings)}%</Text>
            </View>
            {/* <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
              <Text className="text-lg font-semibold">+</Text>
            </TouchableOpacity> */}
            <QuantityButton item={item} items={items} setItems={setItems}/>
          </TouchableOpacity>
        )}
      />

      {/* Custom Button for Checkout */}
      {totalQuantity > 0 && (
        <CustomButton
          title={`Continue to Checkout`}
          tagline={`$${totalCost.toFixed(2)} total before taxes`}
          handlePress={() => router.replace("/cart")}
          containerStyles="mt-7 mb-4"
        />
      )}

      {/* Modal for Item Details */}
      {/* <ItemDetailsModal
        visible={isModalVisible}
        onClose={closeModal}
        selectedItem={selectedItem}
        items={items}
        setItems={setItems}
      /> */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View className="p-4">
              <TouchableOpacity onPress={closeModal} className="self-end p-2">
                <Text className="text-2xl">×</Text>
              </TouchableOpacity>
              {selectedItem && (
                <View>
                  <Image
                    source={{ uri: selectedItem.image_url }}
                    className="w-full h-60 rounded-lg mb-4"
                    resizeMode="cover"
                  />
                  <Text className="text-2xl font-semibold text-black mb-2">{selectedItem.item}</Text>
                  <Text className="text-gray-700 mb-4">{selectedItem.description}</Text>
                  <Text className="text-gray-700 font-semibold">Calories: {selectedItem.calories}</Text>
                  <Text className="text-gray-700 font-semibold mb-4">Ingredients: {selectedItem.ingredients.join(', ')}</Text>
                  </View>
              )}
            </View>
            {/* <View className="absolute bottom-16 left-0 right-0 flex items-center">
              <QuantityButton item={selectedItem} items={items} setItems={setItems} />
            </View> */}
          </Animated.View>
        </PanGestureHandler>
      </Modal>
    </SafeAreaView>
  );
};

// Helper function to calculate the average rating
const calculateAverageRating = (ratings) => {
  const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return ratings.length > 0 ? ((total / ratings.length) * 20).toFixed(0) : "N/A";
};

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30, // Leave a small space at the top
  },
});

export default MenuPage;
