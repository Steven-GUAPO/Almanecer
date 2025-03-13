import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import { PanGestureHandler } from 'react-native-gesture-handler';
import QuantityButton from "../components/QuantityButton";

const ItemDetailsModal = ({ visible, onClose, selectedItem, items, setItems }) => {


  // Animation value for the modal position
  const translateY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
      }));

  // Swipe gesture handler
    const onGestureEvent = (event) => {
      if (event.nativeEvent.translationY > 0) {
        translateY.value = withSpring(event.nativeEvent.translationY);
      }
    };
  
    const onGestureEnd = (event) => {
      if (event.nativeEvent.translationY > 400) {
        onClose();
      } else {
        translateY.value = withSpring(0); // Snap back to full height if not swiped down enough
      }
    };

  return (
     <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View className="p-4">
              <TouchableOpacity onPress={onClose} className="self-end p-2">
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
            <View className="absolute bottom-16 left-0 right-0 flex items-center">
              <QuantityButton item={selectedItem} items={items} setItems={setItems} />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Modal> 
  );
};

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

export default ItemDetailsModal;
