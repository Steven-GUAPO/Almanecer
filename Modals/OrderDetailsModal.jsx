// import React from "react";
// import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
// import { styled } from "nativewind";
// import CartSummary from "../components/CartSummary"; // Ensure correct import

// // Styled Components for NativeWind
// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledScrollView = styled(ScrollView);

// const OrderDetailsModal = ({ visible, order, onClose }) => {
//   if (!order) return null;

//   return (
//     <Modal visible={visible} animationType="slide" transparent={false}>
//       <StyledView className="flex-1 bg-white p-4">
//         {/* Header */}
//         <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-300">
//           <StyledTouchableOpacity onPress={onClose}>
//             <StyledText className="text-lg font-bold">×</StyledText>
//           </StyledTouchableOpacity>
//           <StyledText className="text-lg font-semibold">Order Details</StyledText>
//           <View style={{ width: 24 }} />
//         </StyledView>

//         <StyledScrollView>
//           {/* Address, Delivery, Phone */}
//           <StyledView className="p-4">
//             <StyledText className="text-lg text-black">📍 {order.address}</StyledText>
//             <StyledText className="text-lg text-black">📦 {order.deliveryType || "Leave it at my door"}</StyledText>
//             <StyledText className="text-lg text-black">📞 {order.phone_number}</StyledText>
//           </StyledView>

//           {/* Cart Summary */}
//           <CartSummary cart={order.cart_summary} />

//           {/* Summary */}
//           <StyledView className="p-4">
//             <StyledText className="text-lg font-semibold text-black mb-2">Summary</StyledText>
//             <StyledView className="flex-row justify-between items-center mb-2">
//               <StyledText className="text-gray-700">Subtotal</StyledText>
//               <StyledText className="text-gray-700">${order.subtotal}</StyledText>
//             </StyledView>
//             <StyledView className="flex-row justify-between items-center mb-2">
//               <StyledText className="text-gray-700">Service Fee</StyledText>
//               <StyledText className="text-gray-700">${order.service_fee}</StyledText>
//             </StyledView>
//             <StyledView className="flex-row justify-between items-center mb-2">
//               <StyledText className="text-gray-700">Tax</StyledText>
//               <StyledText className="text-gray-700">${order.tax}</StyledText>
//             </StyledView>
//             <StyledView className="flex-row justify-between items-center border-t border-gray-300 pt-4">
//               <StyledText className="text-lg font-semibold text-black">Total</StyledText>
//               <StyledText className="text-lg font-semibold text-black">
//                 ${order.total_amount}
//               </StyledText>
//             </StyledView>
//           </StyledView>
//         </StyledScrollView>
//       </StyledView>
//     </Modal>
//   );
// };

// export default OrderDetailsModal;
// import React from "react";
// import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
// import { styled } from "nativewind";
// import CartSummary from "../components/CartSummary"; // Ensure correct import

// // Styled Components for NativeWind
// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledScrollView = styled(ScrollView);

// const OrderDetailsModal = ({ visible, order, onClose }) => {
//   if (!order){
//     console.log("close")
//     return null;
//   }

//   return (
//     <Modal visible={visible} animationType="slide" transparent={false}>
//       {/* <TouchableOpacity 
//         className="flex-1 bg-black bg-opacity-50 justify-end"
//         activeOpacity={1}
//         onPress={onClose} // Close modal when clicking outside
//       > */}
//         <StyledView className="bg-white h-[90%] rounded-t-3xl p-4">
//           {/* Header */}
//           <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-300">
//             <StyledTouchableOpacity onPress={onClose}>
//               <StyledText className="text-lg font-bold">×</StyledText>
//             </StyledTouchableOpacity>
//             <StyledText className="text-lg font-semibold">Order Details</StyledText>
//             <View style={{ width: 24 }} />
//           </StyledView>

//           <StyledScrollView>
//             {/* Address, Delivery, Phone Section */}
//             <StyledView className="p-4 bg-gray-100 rounded-lg shadow-sm mx-2 my-4">
//               <StyledView className="flex-row items-center mb-2">
//                 <StyledText className="text-lg">📍</StyledText>
//                 <StyledText className="text-lg text-black ml-2">{order.address}</StyledText>
//               </StyledView>
//               <StyledView className="flex-row items-center mb-2">
//                 <StyledText className="text-lg">📦</StyledText>
//                 <StyledText className="text-lg text-black ml-2">{order.deliveryType || "Leave it at my door"}</StyledText>
//               </StyledView>
//               <StyledView className="flex-row items-center">
//                 <StyledText className="text-lg">📞</StyledText>
//                 <StyledText className="text-lg text-black ml-2">{order.phone_number}</StyledText>
//               </StyledView>
//             </StyledView>

//             {/* Cart Summary */}
//             <CartSummary cart={order.cart_summary} />

//             {/* Summary */}
//             <StyledView className="p-4">
//               <StyledText className="text-lg font-semibold text-black mb-2">Summary</StyledText>
//               <StyledView className="flex-row justify-between items-center mb-2">
//                 <StyledText className="text-gray-700">Subtotal</StyledText>
//                 <StyledText className="text-gray-700">${order.subtotal}</StyledText>
//               </StyledView>
//               <StyledView className="flex-row justify-between items-center mb-2">
//                 <StyledText className="text-gray-700">Service Fee</StyledText>
//                 <StyledText className="text-gray-700">${order.service_fee}</StyledText>
//               </StyledView>
//               <StyledView className="flex-row justify-between items-center mb-2">
//                 <StyledText className="text-gray-700">Tax</StyledText>
//                 <StyledText className="text-gray-700">${order.tax}</StyledText>
//               </StyledView>
//               <StyledView className="flex-row justify-between items-center border-t border-gray-300 pt-4">
//                 <StyledText className="text-lg font-semibold text-black">Total</StyledText>
//                 <StyledText className="text-lg font-semibold text-black">
//                   ${order.total_amount}
//                 </StyledText>
//               </StyledView>
//             </StyledView>
//           </StyledScrollView>
//         </StyledView>
//       {/* </TouchableOpacity> */}
//     </Modal>
//   );
// };

// export default OrderDetailsModal;
import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { styled } from "nativewind";
import CartSummary from "../components/CartSummary"; // Ensure correct import
import LottieView from "lottie-react-native";

// Styled Components for NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const OrderDetailsModal = ({ visible, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <StyledView className="flex-1 justify-end bg-opacity-10">
        <StyledView className="bg-white h-[90%] rounded-t-3xl p-4">
          {/* Header */}
          <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-300">
            <StyledTouchableOpacity onPress={onClose}>
              <StyledText className="text-lg font-bold">×</StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-lg font-semibold">Order Details</StyledText>
            <View style={{ width: 24 }} />
          </StyledView>

          <StyledScrollView>

            {/* Delivery Animation & Status Message */}
            {!order.delivered && (
              <StyledView className="items-center my-4">
                <LottieView
                  source={require("../assets/animations/delivery.json")}
                  autoPlay
                  loop
                  style={{ width: 250, height: 200 }}
                />
                <StyledText className="text-lg font-semibold text-gray-700 mt-2">
                  Your order will be delivered shortly
                </StyledText>
              </StyledView>
            )}
            {/* Address, Delivery, Phone Section */}
            <StyledView className="p-4 bg-gray-200 rounded-lg shadow-sm mx-2 my-4">
              <StyledView className="flex-row items-center mb-2">
                <StyledText className="text-lg">📍</StyledText>
                <StyledText className="text-lg text-black ml-2">{order.address}</StyledText>
              </StyledView>
              <StyledView className="flex-row items-center mb-2">
                <StyledText className="text-lg">📦</StyledText>
                <StyledText className="text-lg text-black ml-2">{order.deliveryType || "Leave it at my door"}</StyledText>
              </StyledView>
              <StyledView className="flex-row items-center">
                <StyledText className="text-lg">📞</StyledText>
                <StyledText className="text-lg text-black ml-2">{order.phone_number}</StyledText>
              </StyledView>
            </StyledView>

            {/* Cart Summary */}
            <CartSummary cart={order.cart_summary} />

            {/* Summary */}
            <StyledView className="p-4">
              <StyledText className="text-lg font-semibold text-black mb-2">Summary</StyledText>
              <StyledView className="flex-row justify-between items-center mb-2">
                <StyledText className="text-gray-700">Subtotal</StyledText>
                <StyledText className="text-gray-700">${order.subtotal}</StyledText>
              </StyledView>
              <StyledView className="flex-row justify-between items-center mb-2">
                <StyledText className="text-gray-700">Service Fee</StyledText>
                <StyledText className="text-gray-700">${order.service_fee}</StyledText>
              </StyledView>
              <StyledView className="flex-row justify-between items-center mb-2">
                <StyledText className="text-gray-700">Tax</StyledText>
                <StyledText className="text-gray-700">${order.tax}</StyledText>
              </StyledView>
              <StyledView className="flex-row justify-between items-center border-t border-gray-300 pt-4">
                <StyledText className="text-lg font-semibold text-black">Total</StyledText>
                <StyledText className="text-lg font-semibold text-black">
                  ${order.total_amount}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledScrollView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default OrderDetailsModal;
