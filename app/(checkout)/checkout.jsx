import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Modal, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocalSearchParams, router } from 'expo-router';
import AddressModal from "../../Modals/AddressModal";
import DeliveryTypeModal from "../../Modals/DeliveryTypeModal";
import PhoneNumberModal from "../../Modals/PhoneNumberModal";
import MapScreen from "../../components/MapView";
import CartSummary from "../../components/CartSummary";
import { ScrollView } from "react-native-gesture-handler";
import { placeOrder } from "../../backend/orders";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getFromSecureStore, saveToSecureStore } from "../../backend/secureCache";

const Checkout = () => {
  // const navigation = useNavigation();
  // const route = useRoute();
  const params = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  // const [userAddress, setUserAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [deliveryType, setDeliveryType] = useState("Hand it to me"); // Default selection
  const [isDeliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // Default empty phone number
  const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);
  const { user } = useGlobalContext();
  const CHECKOUT_KEY = "checkoutData"

  // Load Checkout Data when Screen Opens
  useEffect(() => {
    const loadStoredValues = async () => {
      try {
        const storedData = await getFromSecureStore(CHECKOUT_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setSelectedAddress(parsedData.selectedAddress || null);
          setDeliveryType(parsedData.deliveryType || "Hand it to me");
          setPhoneNumber(parsedData.phoneNumber || "");
          setLatitude(parsedData.latitude || 0);
          setLongitude(parsedData.longitude || 0);
        }
      } catch (error) {
        console.error("Failed to load stored checkout data:", error);
      }
    };
    loadStoredValues();
  }, []);

  // Function to Save Checkout Data (Called on Proceed & Exit)
  const saveCheckoutData = async () => {
    const checkoutData = {
      selectedAddress,
      deliveryType,
      phoneNumber,
      latitude,
      longitude,
    };
    await saveToSecureStore(CHECKOUT_KEY, JSON.stringify(checkoutData));
  };

  const dataFromAddressModal = (data) => {
    // console.log(data)
    setSelectedAddress(data.selectedAddress)
    const lat = parseFloat(data.selectedAddress?.lat)
    if(!Number.isNaN(lat)){
      setLatitude(lat)
    }
    const lon = parseFloat(data.selectedAddress?.lon)
    if(!Number.isNaN(lon)){
      setLongitude(lon)
    }
    // setUserAddress(data.address)
  }

  const proceedToPayment = async () => {
    if (!selectedAddress?.display_address) {
          Alert.alert("Error", "Please fill in the delivery address");
          return;
      }
    
      if (!phoneNumber) {
        Alert.alert("Error", "Please fill in the phone number");
        return;
    }

    // Save Checkout Data Before Proceeding
    await saveCheckoutData();

      const orderData = {
        subtotal: subtotal,
        service_fee: serviceFee,
        tax: tax,
        total_amount: total,
        address: selectedAddress.display_address,
        phone_number: phoneNumber,
        order_date: new Date().toISOString(),
        customer_name: user.first_name + ', ' + user.last_name, // Ensure customerName is defined
        customer_id: user._id,
        cart_summary: parsedCart, // Ensure parsedCart is an array of items
    };
    
    try {
      const orderResponse = await placeOrder(orderData);
      console.log("Order placed successfully:", orderResponse._id);
      // router.replace("/orderconfirmation");
      router.push({
          pathname: "/orderconfirmation",
                    params: {
                      orderId: orderResponse._id
                    }
                  })
    } catch (error) {
      console.error("Order placement failed:", error.message);
      Alert.alert("Error", error.message);
  }

  }


  const { subtotal = 0.00, deliveryFee = 0.00, serviceFee = 0.00, tax = 0.00, total = 0.00, cart } = params;
  const parsedCart = JSON.parse(decodeURIComponent(cart))
  console.log(user)
  return (
    <SafeAreaView className="bg-white h-full">
      {/* Header */}
      <ScrollView>
      <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-300">
        <TouchableOpacity onPress={async () => { await saveCheckoutData(); router.replace("/cart")}}>
          <Text className="text-lg font-bold">×</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Dummy Image */}
      <View className="w-full h-40">
        {/* <Image
          source={{ uri: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2022/08/Google-Maps-icon-on-map.png?q=50&fit=crop&w=1140&h=&dpr=1.5" }} // Dummy image
          className="w-full h-full"
          resizeMode="cover"
        /> */}
        <MapScreen latitude={latitude} longitude={longitude} />
      </View>

      {/* Address & Contact Section */}
      <View className="p-4">
        <TouchableOpacity 
        className="flex-row justify-between items-center py-3 border-b border-gray-300"
        onPress={() => setModalVisible(true)}>
          <Text className="text-lg text-black" numberOfLines={1} ellipsizeMode="tail">📍 {selectedAddress?.display_address || "Please add delivery address"}</Text>
          <Text className="text-gray-500">{">"}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        className="flex-row justify-between items-center py-3 border-b border-gray-300"
        onPress={() => setDeliveryModalVisible(true)}>
          <Text className="text-lg text-black">📦 {deliveryType} </Text>
          <Text className="text-gray-500">{">"}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        className="flex-row justify-between items-center py-3 border-b border-gray-300"
        onPress={() => setPhoneModalVisible(true)}>
          <Text className="text-lg text-black">📞 {phoneNumber || "Please add your phone number"}</Text>
          <Text className="text-gray-500">{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Summary Section */}
      <CartSummary cart={parsedCart} />

      {/* Summary Section */}
      <View className="p-4">
        <Text className="text-lg font-semibold text-black mb-2">Summary</Text>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">${subtotal}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-700">Service Fee</Text>
          <Text className="text-gray-700">${serviceFee}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-700">Estimated Tax</Text>
          <Text className="text-gray-700">${tax}</Text>
        </View>
        <View className="flex-row justify-between items-center border-t border-gray-300 pt-4">
          <Text className="text-lg font-semibold text-black">Total</Text>
          <Text className="text-lg font-semibold text-black">
            ${total}
          </Text>
        </View>
      </View>
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity
        className="bg-secondary p-4 rounded-full mx-4 mt-4"
        onPress={() => proceedToPayment()}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Proceed
        </Text>
      </TouchableOpacity>

      {/* Address Modal */}
      <AddressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(data) => dataFromAddressModal(data)}
      />

      {/* Delivery Type Modal */}
      <DeliveryTypeModal
        visible={isDeliveryModalVisible}
        onClose={() => setDeliveryModalVisible(false)}
        deliveryType={deliveryType}
        setDeliveryType={setDeliveryType}
      />

      {/* Phone Number Modal */}
      <PhoneNumberModal
        visible={isPhoneModalVisible}
        onClose={() => setPhoneModalVisible(false)}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      
    </SafeAreaView>
  );
};

export default Checkout;
