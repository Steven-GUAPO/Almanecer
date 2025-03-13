import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

const DeliveryAddress = () => {
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [entryCode, setEntryCode] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [instructions, setInstructions] = useState("");

  return (
    <View className="flex-1 justify-end bg-black bg-opacity-50">
            {/* Modal Container */}
            <View className="bg-white h-full rounded-t-2xl p-4 shadow-lg">
              {/* Header */}
              <View className="flex-row justify-between items-center border-b border-gray-300 pb-3">
                <TouchableOpacity onPress={() => router.replace("/checkout")}>
                  <Text className="text-lg font-bold">×</Text>
                </TouchableOpacity>
                <Text className="text-lg font-semibold">Edit Address</Text>
                <View style={{ width: 24 }} />
              </View>
    
              <ScrollView className="mt-4">
                {/* Address Input */}
                <Text className="text-gray-600 mb-1">Address</Text>
                <TextInput
                  placeholder="Enter address"
                  value={address}
                  onChangeText={setAddress}
                  className="border border-gray-300 p-3 rounded-lg text-lg mb-3"
                />
    
                {/* Apartment and Entry Code */}
                <View className="flex-row justify-between">
                  <View className="w-[48%]">
                    <Text className="text-gray-600 mb-1">Apartment/Suite</Text>
                    <TextInput
                      placeholder="511"
                      value={apartment}
                      onChangeText={setApartment}
                      className="border border-gray-300 p-3 rounded-lg text-lg"
                    />
                  </View>
                  <View className="w-[48%]">
                    <Text className="text-gray-600 mb-1">Entry Code</Text>
                    <TextInput
                      placeholder="Entry Code"
                      value={entryCode}
                      onChangeText={setEntryCode}
                      className="border border-gray-300 p-3 rounded-lg text-lg"
                    />
                  </View>
                </View>
    
                {/* Building Name */}
                <Text className="text-gray-600 mt-4 mb-1">Building Name</Text>
                <TextInput
                  placeholder="Building Name"
                  value={buildingName}
                  onChangeText={setBuildingName}
                  className="border border-gray-300 p-3 rounded-lg text-lg"
                />
    
                {/* Location Entrance Map */}
                <Text className="text-gray-600 mt-4 mb-2">
                  Where is the location entrance?
                </Text>
                <View className="w-full h-40 rounded-lg overflow-hidden my-2">
                  <Image
                    source={{ uri: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2022/08/Google-Maps-icon-on-map.png?q=50&fit=crop&w=1140&h=&dpr=1.5" }} // Dummy Map
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
    
                {/* Additional Instructions */}
                <Text className="text-gray-600 mt-4 mb-1">
                  Any instructions to help find your home?
                </Text>
                <TextInput
                  placeholder="e.g. enter on Main St, it's the 4th door on the right"
                  value={instructions}
                  onChangeText={setInstructions}
                  multiline
                  className="border border-gray-300 p-3 rounded-lg text-lg h-20"
                />
              </ScrollView>
    
              {/* Save Button */}
              <TouchableOpacity
                className="bg-red-500 p-4 rounded-full mt-6"
              >
                <Text className="text-center text-white text-lg font-semibold">
                  Save Address
                </Text>
              </TouchableOpacity>
            </View>
          </View>
  );

};

export default DeliveryAddress;