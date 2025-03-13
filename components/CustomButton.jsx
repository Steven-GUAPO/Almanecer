// import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

// const CustomButton = ({
//   title,
//   handlePress,
//   containerStyles,
//   textStyles,
//   isLoading,
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       activeOpacity={0.7}
//       className={`bg-secondary rounded-3xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
//         isLoading ? "opacity-50" : ""
//       }`}
//       disabled={isLoading}
//     >
//       <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
//         {title}
//       </Text>

//       {isLoading && (
//         <ActivityIndicator
//           animating={isLoading}
//           color="#fff"
//           size="small"
//           className="ml-2"
//         />
//       )}
//     </TouchableOpacity>
//   );
// };

// export default CustomButton;
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title,
  tagline,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-3xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <View className="flex flex-col items-center">
        <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
        {tagline && (
          <Text className="text-white font-regular text-sm mt-1">
            {tagline}
          </Text>
        )}
      </View>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
