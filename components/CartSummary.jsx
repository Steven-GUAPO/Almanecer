// import React from "react";
// import { View, Text, Image, FlatList } from "react-native";
// import { styled } from "nativewind"; // Import styled API

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledImage = styled(Image);

// const CartSummary = ({ cart }) => {
//   // console.log(typeof cart)
//   // cart = JSON.parse(cart);

//   return (
//     <StyledView className="mt-6 bg-white p-4 rounded-lg shadow-md">
//       <StyledText className="text-lg font-semibold mb-3">Cart Summary</StyledText>
      
//       <FlatList
//         data={cart}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <StyledView className="flex-row items-center justify-between mb-2">
            
//             {/* Item Details */}
//             <StyledView className="flex-1 ml-2">
//               <StyledText className="text-base font-medium">{item.item}</StyledText>
//               <StyledText className="text-gray-500 text-sm">x {item.quantity}</StyledText>
//             </StyledView>

//             {/* Price */}
//             <StyledText className="text-base font-semibold">
//               ${(item.price * item.quantity).toFixed(2)}
//             </StyledText>
//           </StyledView>
//         )}
//         nestedScrollEnabled={true} // Enable nested scrolling
//         style={{ maxHeight: 180 }} // Set a max height to prevent infinite scrolling
//         showsVerticalScrollIndicator={false}
//       />
//     </StyledView>
//   );
// };

// export default CartSummary;
import React from "react";
import { View, Text, FlatList } from "react-native";
import { styled } from "nativewind"; // Import styled API

const StyledView = styled(View);
const StyledText = styled(Text);

const CartSummary = ({ cart }) => {
  return (
    <StyledView className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <StyledText className="text-lg font-semibold mb-3">Cart Summary</StyledText>

      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <StyledView className="flex-row items-center justify-between mb-2">
            {/* Item Details */}
            <StyledView className="flex-1 ml-2">
              <StyledText className="text-base font-medium">{item.item}</StyledText>
              <StyledText className="text-gray-500 text-sm">x {item.quantity}</StyledText>
            </StyledView>

            {/* Price */}
            <StyledText className="text-base font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </StyledText>
          </StyledView>
        )}
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 20 }} />} // Prevents cut-off items
      />
    </StyledView>
  );
};

export default CartSummary;
