import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const PhoneNumberModal = ({ visible, onClose, phoneNumber, setPhoneNumber }) => {
  // Function to format phone number dynamically as user types
  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D+/g, ""); // Remove non-numeric characters
    let formattedNumber = "";

    if (cleaned.length > 0) {
      formattedNumber = `(${cleaned.substring(0, 3)}`;
      if (cleaned.length >= 4) formattedNumber += `) ${cleaned.substring(3, 6)}`;
      if (cleaned.length >= 7) formattedNumber += `-${cleaned.substring(6, 10)}`;
    }

    return formattedNumber;
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (text) => {
    const cleaned = text.replace(/\D+/g, ""); // Remove non-numeric characters
    if (cleaned.length <= 10) {
      setPhoneNumber(formatPhoneNumber(cleaned));
    }
  };

  // Validate & close modal
  const handleSave = () => {
    const cleaned = phoneNumber.replace(/\D+/g, ""); // Remove non-numeric characters
    if (cleaned.length !== 10) {
      Alert.alert("Invalid Phone Number", "Please enter a 10-digit phone number.");
      return;
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <StyledView className="flex-1 justify-center items-center bg-white bg-opacity-50">
        <StyledView className="bg-white h-[90%] rounded-lg p-6" style={{ width: "92%" }}>
          {/* Header */}
          <StyledView className="flex-row justify-between items-center border-b border-gray-300 pb-3">
            <StyledTouchableOpacity onPress={onClose}>
              <StyledText className="text-lg font-bold">×</StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-lg font-semibold">Edit Phone Number</StyledText>
            <StyledView style={{ width: 24 }} />
          </StyledView>

          {/* Phone Number Input Section */}
          <StyledText className="text-gray-700 mt-4">Enter your phone number:</StyledText>

          <StyledView className="flex-row items-center justify-between mt-4 border border-gray-300 rounded-lg p-3 bg-gray-100">
            {/* <StyledText className="text-lg text-gray-700 font-medium">+1</StyledText> */}
            <StyledTextInput
              className="flex-1 text-lg text-center"
              placeholder="(XXX) XXX-XXXX"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={14} // Formatted length (10 digits + formatting characters)
              style={{ marginLeft: 8 }}
            />
          </StyledView>

          {/* Save Button */}
          <StyledTouchableOpacity
            className="bg-secondary p-4 rounded-full mt-6"
            onPress={handleSave}
          >
            <StyledText className="text-center text-white text-lg font-semibold">
              Save
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default PhoneNumberModal;

