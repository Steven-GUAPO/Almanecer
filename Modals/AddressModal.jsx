// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   FlatList,
//   Pressable
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { styled } from "nativewind"; // Import styled API
// import { relatedAddresses } from "../backend/autocomplete";
// import AddressItem from "../components/AddressItem";
// import { Keyboard } from "react-native";
// import MapScreen from "../components/MapView";

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTextInput = styled(TextInput);
// const StyledTouchableOpacity = styled(TouchableOpacity);

// const AddressModal = ({ visible, onClose, onSave }) => {
//   const [address, setAddress] = useState("");
//   const [selectedAddress, setSelectedAddress] = useState();
//   const [addressRecomendations, setAddressRecomendations] = useState([]);
//   const [apartment, setApartment] = useState("");
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   const [entryCode, setEntryCode] = useState("");
//   const [buildingName, setBuildingName] = useState("");
//   const [instructions, setInstructions] = useState("");

//   const onChangeText = async (text) => {
//     // console.log(text);
//     setAddress(text);
//     if(text.length > 5){
//       const addresses = await relatedAddresses(text)
//       setAddressRecomendations(addresses)
//     }
//   }

//   const setAddressFromRecomendation = (address) => {
//       setAddress(address.display_address)
//       setSelectedAddress(address)
//       setLatitude(parseFloat(address.lat))
//       setLongitude(parseFloat(address.lon))
//       setAddressRecomendations([])
//       Keyboard.dismiss()
//   }

//   return (
//     <Modal visible={visible} animationType="slide" transparent={true}>
//       <StyledView className="flex-1 justify-end bg-white bg-opacity-100">
//         {/* Modal Container */}
//         <StyledView className="bg-white h-[90%] rounded-t-2xl p-4 shadow-lg">
//           {/* Header */}
//           <StyledView className="flex-row justify-between items-center border-b border-gray-300 pb-3">
//             <StyledTouchableOpacity onPress={onClose}>
//               <StyledText className="text-lg font-bold">×</StyledText>
//             </StyledTouchableOpacity>
//             <StyledText className="text-lg font-semibold">Edit Address</StyledText>
//             <View style={{ width: 24 }} />
//           </StyledView>

//           <ScrollView className="mt-4">
//             {/* Address Input */}
//             <StyledText className="text-gray-600 mb-1">Address</StyledText>
//             <StyledTextInput
//               placeholder="Enter address"
//               value={address}
//               onChangeText={onChangeText}
//               className="border border-gray-300 p-3 rounded-lg text-lg mb-3"
//             />

//             <FlatList
//               data={addressRecomendations}
//               renderItem={({item, index}) => (
//                 <Pressable onPress={() => setAddressFromRecomendation(item)}>
//                     {/* <Text className="text-gray-800">{item.display_address}</Text> */}
//                     <AddressItem item={item} onSelect={setAddressFromRecomendation} />
//                 </Pressable>
//               )}
//               keyExtractor={item => item.osm_id}
//               showsVerticalScrollIndicator={false}
//             />

//             {/* Apartment and Entry Code */}
//             <StyledView className="flex-row justify-between">
//               <StyledView className="w-[48%]">
//                 <StyledText className="text-gray-600 mb-1">Apartment/Suite</StyledText>
//                 <StyledTextInput
//                   placeholder="Enter Apartment (If any)"
//                   value={apartment}
//                   onChangeText={setApartment}
//                   className="border border-gray-300 p-3 rounded-lg text-lg"
//                 />
//               </StyledView>
//               <StyledView className="w-[48%]">
//                 <StyledText className="text-gray-600 mb-1">Entry Code</StyledText>
//                 <StyledTextInput
//                   placeholder="Enter Gate Code (If Any)"
//                   value={entryCode}
//                   onChangeText={setEntryCode}
//                   className="border border-gray-300 p-3 rounded-lg text-lg"
//                 />
//               </StyledView>
//             </StyledView>

//             {/* Building Name */}
//             <StyledText className="text-gray-600 mt-4 mb-1">Building Name</StyledText>
//             <StyledTextInput
//               placeholder="Building Name"
//               value={buildingName}
//               onChangeText={setBuildingName}
//               className="border border-gray-300 p-3 rounded-lg text-lg"
//             />

//             {/* Location Entrance Map */}
//             <StyledText className="text-gray-600 mt-4 mb-2">
//               Where is the location entrance?
//             </StyledText>
//             <StyledView className="w-full h-40 rounded-lg overflow-hidden my-2">
//               {/* <Image
//                   source={{ uri: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2022/08/Google-Maps-icon-on-map.png?q=50&fit=crop&w=1140&h=&dpr=1.5" }} // Dummy image
//                   className="w-full h-full"
//                   resizeMode="cover"
//               />
//               <StyledView className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                 <StyledText className="text-black text-lg font-semibold">📍</StyledText>
//               </StyledView> */}
//               <MapScreen latitude={latitude} longitude={longitude} />
//             </StyledView>

//             {/* Additional Instructions */}
//             <StyledText className="text-gray-600 mt-4 mb-1">
//               Any instructions to help find your home?
//             </StyledText>
//             <StyledTextInput
//               placeholder="e.g. enter on Main St, it's the 4th door on the right"
//               value={instructions}
//               onChangeText={setInstructions}
//               multiline
//               className="border border-gray-300 p-3 rounded-lg text-lg h-20"
//             />
//           </ScrollView>

//           {/* Save Button */}
//           <StyledTouchableOpacity
//             className="bg-red-500 p-4 rounded-full mt-6"
//             onPress={() => {
//               onSave({
//                 address,
//                 selectedAddress,
//                 apartment,
//                 entryCode,
//                 buildingName,
//                 instructions,
//               });
//               onClose();
//             }}
//           >
//             <StyledText className="text-center text-white text-lg font-semibold">
//               Save Address
//             </StyledText>
//           </StyledTouchableOpacity>
//         </StyledView>
//       </StyledView>
//     </Modal>
//   );
// };

// export default AddressModal;
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind"; // Import styled API
import { relatedAddresses } from "../backend/autocomplete";
import AddressItem from "../components/AddressItem";
import { Keyboard } from "react-native";
import MapScreen from "../components/MapView";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AddressModal = ({ visible, onClose, onSave }) => {
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState();
  const [addressRecomendations, setAddressRecomendations] = useState([]);
  const [apartment, setApartment] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [entryCode, setEntryCode] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [instructions, setInstructions] = useState("");

  const onChangeText = async (text) => {
    setAddress(text);
    if (text.length > 5) {
      const addresses = await relatedAddresses(text);
      setAddressRecomendations(addresses);
    }
  };

  const saveAddress = () => {
    if(!selectedAddress){
      Alert.alert("Error", "Please fill address");
      return
    }

    onSave({
      address,
      selectedAddress,
      apartment,
      entryCode,
      buildingName,
      instructions,
    });
    onClose();
  }

  const setAddressFromRecomendation = (address) => {
    setAddress(address.display_address);
    setSelectedAddress(address);
    setLatitude(parseFloat(address.lat));
    setLongitude(parseFloat(address.lon));
    setAddressRecomendations([]);
    Keyboard.dismiss();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <StyledView className="flex-1 justify-end bg-white bg-opacity-100">
        <StyledView className="bg-white h-[90%] rounded-t-2xl p-4 shadow-lg">
          {/* Header */}
          <StyledView className="flex-row justify-between items-center border-b border-gray-300 pb-3">
            <StyledTouchableOpacity onPress={onClose}>
              <StyledText className="text-lg font-bold">×</StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-lg font-semibold">Edit Address</StyledText>
            <View style={{ width: 24 }} />
          </StyledView>

          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }}
          >
            <StyledView style={{ flex: 1 }}>
              {/* Address Input */}
              <StyledText className="text-gray-600 mb-1">Address</StyledText>
              <StyledTextInput
                placeholder="Enter address"
                value={address}
                onChangeText={onChangeText}
                className="border border-gray-300 p-3 rounded-lg text-lg mb-3"
              />

              {/* FlatList wrapped in a View with fixed height */}
              {addressRecomendations.length > 0 && (
                <View style={{ maxHeight: 200 }}>
                  <FlatList
                    data={addressRecomendations}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => setAddressFromRecomendation(item)}>
                        <AddressItem item={item} onSelect={setAddressFromRecomendation} />
                      </Pressable>
                    )}
                    keyExtractor={(item) => item.osm_id.toString()}
                    // showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                  />
                </View>
              )}

              {/* Apartment and Entry Code */}
              <StyledView className="flex-row justify-between mt-3">
                <StyledView className="w-[48%]">
                  <StyledText className="text-gray-600 mb-1">Apartment/Suite</StyledText>
                  <StyledTextInput
                    placeholder="Enter Apartment (If any)"
                    value={apartment}
                    onChangeText={setApartment}
                    className="border border-gray-300 p-3 rounded-lg text-lg"
                  />
                </StyledView>
                <StyledView className="w-[48%]">
                  <StyledText className="text-gray-600 mb-1">Entry Code</StyledText>
                  <StyledTextInput
                    placeholder="Enter Gate Code (If Any)"
                    value={entryCode}
                    onChangeText={setEntryCode}
                    className="border border-gray-300 p-3 rounded-lg text-lg"
                  />
                </StyledView>
              </StyledView>

              {/* Building Name */}
              <StyledText className="text-gray-600 mt-4 mb-1">Building Name</StyledText>
              <StyledTextInput
                placeholder="Building Name"
                value={buildingName}
                onChangeText={setBuildingName}
                className="border border-gray-300 p-3 rounded-lg text-lg"
              />

              {/* Location Entrance Map */}
              <StyledText className="text-gray-600 mt-4 mb-2">
                verify the location!
              </StyledText>
              <StyledView className="w-full h-40 rounded-lg overflow-hidden my-2">
                <MapScreen latitude={latitude} longitude={longitude} />
              </StyledView>

              {/* Additional Instructions */}
              <StyledText className="text-gray-600 mt-4 mb-1">
                Any instructions to help find your home?
              </StyledText>
              <StyledTextInput
                placeholder="e.g. enter on Main St, it's the 4th door on the right"
                value={instructions}
                onChangeText={setInstructions}
                multiline
                className="border border-gray-300 p-3 rounded-lg text-lg h-20"
              />
            </StyledView>
          </KeyboardAvoidingView>

          {/* Save Button */}
          <StyledTouchableOpacity
            className="bg-secondary p-4 rounded-full mt-6"
            onPress={() => {saveAddress()}}
          >
            <StyledText className="text-center text-white text-lg font-semibold">
              Save Address
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default AddressModal;
