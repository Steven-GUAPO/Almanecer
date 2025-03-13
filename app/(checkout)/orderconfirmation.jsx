import React, {useEffect} from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, router } from 'expo-router';

const OrderConfirmationScreen = () => {

    const params = useLocalSearchParams();

    useEffect(() => {
        const clearCartCache = async () => {
          try {
            console.log("clearing cache after order sucess")
            await AsyncStorage.removeItem("cart");
          } catch (error) {
            console.error("Error clearing cart from storage:", error);
          }
        };
    
        clearCartCache(); // Call function on component mount
      }, []);

      useEffect(() => {
        const timer = setTimeout(() => {
          router.replace("/ordersscreen");
        }, 5000);
        return () => clearTimeout(timer);
      }, []);

      const { orderId } = params;

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* Animated Tick Mark */}
      <LottieView
        source={require("../../assets/animations/orderConfirmation.json")} // Replace with your Lottie file
        autoPlay
        loop={true}
        className="w-40 h-40"
      />

      {/* Confirmation Message */}
      <Text className="text-2xl font-bold text-orange-500 mt-6">
        Order Confirmed!
      </Text>
      <Text className="text-lg text-gray-500 text-center mt-2 px-6">
        Order Id - { orderId } ~{"\n"}
        Your items will be delivered to you shortly.
      </Text>
    </View>
  );
};

export default OrderConfirmationScreen;
