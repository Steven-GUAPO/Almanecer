import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; 

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AddressItem = ({ item, onSelect }) => {
  return (
    <StyledTouchableOpacity 
      className="flex-row items-center p-3 border-b border-gray-300"
      onPress={() => onSelect(item)}
    >
      <StyledText className="text-lg">📍</StyledText>
      <StyledView className="ml-3">
        <StyledText className="text-black font-semibold">{item.display_place}</StyledText>
        <StyledText className="text-gray-500 text-sm">{item.display_address}</StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default AddressItem;
