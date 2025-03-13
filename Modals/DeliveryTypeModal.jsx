import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const DeliveryTypeModal = ({ visible, onClose, deliveryType, setDeliveryType }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <StyledView className="flex-1 justify-center items-center bg-white bg-opacity-50">
        <StyledView className="bg-white w-11/12 h-[90%] rounded-lg p-6">
          {/* Header */}
          <StyledView className="flex-row justify-between items-center border-b border-gray-300 pb-3">
            <StyledTouchableOpacity onPress={onClose}>
              <StyledText className="text-lg font-bold">×</StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-lg font-semibold">Delivery Preferences</StyledText>
            <View style={{ width: 24 }} />
          </StyledView>

          {/* Options */}
          <StyledText className="text-gray-700 mt-4">
            How would you like the order to be dropped off?
          </StyledText>

          {/* Radio Buttons */}
          <StyledTouchableOpacity
            className="flex-row items-center mt-4"
            onPress={() => setDeliveryType("Hand it to me")}
          >
            <Text className="text-2xl">{deliveryType === "Hand it to me" ? "🔘" : "⚪"}</Text>
            <Text className="text-lg ml-2">Hand it to me</Text>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="flex-row items-center mt-4"
            onPress={() => setDeliveryType("Leave it at my door")}
          >
            <Text className="text-2xl">{deliveryType === "Leave it at my door" ? "🔘" : "⚪"}</Text>
            <Text className="text-lg ml-2">Leave it at my door</Text>
          </StyledTouchableOpacity>

          {/* Update Button */}
          <StyledTouchableOpacity
            className="bg-secondary p-4 rounded-full mt-6"
            onPress={onClose}
          >
            <StyledText className="text-center text-white text-lg font-semibold">
              Update
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default DeliveryTypeModal;
