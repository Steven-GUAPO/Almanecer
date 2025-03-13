import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//import { images } from "../../constants";
import { signUpUser } from "../../backend/api";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    password: "",
  });

  // Function to format phone number dynamically
  const formatPhoneNumber = (input) => {
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, "");
    
    // Limit input to 10 digits
    const limited = cleaned.substring(0, 10);

    // Apply formatting
    if (limited.length <= 3) {
      return `(${limited}`;
    } else if (limited.length <= 6) {
      return `(${limited.substring(0, 3)}) ${limited.substring(3)}`;
    } else {
      return `(${limited.substring(0, 3)}) ${limited.substring(3, 6)}-${limited.substring(6)}`;
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    console.log(password);
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\+\-=\[\]{};':"\\|,.<>\/\?]).{8,}$/;
    console.log((regex.test(password))? "passed passes" : "failed failed");
    return regex.test(password);
  };

  const submit = async () => {
    const { first_name, last_name, email_id, phone_number, password } = form;

    if (!first_name || !last_name || !email_id || !phone_number || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isValidEmail(email_id)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Ensure phone number has exactly 10 digits
    if (phone_number.replace(/\D/g, "").length !== 10) {
      Alert.alert("Error", "Phone number must be 10 digits.");
      return;
    }

    // Check password complexity
    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        `Password must:
        - Have at least one uppercase letter
        - Have at least one digit
        - Have at least one special character from the set: !@#$%^&*()_+-=[]{};:'"|,.<>/?
        - Be at least 8 characters long`
      );
      return;
    }

    setSubmitting(true);
    try {
      console.log("signup");
      const result = await signUpUser({
        email_id,
        password,
        first_name,
        last_name,
        phone_number,
      });

      setIsLogged(true);
      setUser(result)
      router.replace("/menu");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAwareScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up
          </Text>

          {/* Row for First Name and Last Name */}
          <View className="flex-row justify-between mt-10">
            <FormField
              title="First Name"
              value={form.first_name}
              handleChangeText={(e) => setForm({ ...form, first_name: e })}
              otherStyles="flex-1 mr-2"
            />
            <FormField
              title="Last Name"
              value={form.last_name}
              handleChangeText={(e) => setForm({ ...form, last_name: e })}
              otherStyles="flex-1 ml-2"
            />
          </View>

          {/* Email Input with validation */}
          <FormField
            title="Email ID"
            value={form.email_id}
            handleChangeText={(e) => setForm({ ...form, email_id: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          {/* Phone Input with Formatting */}
          <FormField
            title="Phone"
            value={form.phone_number}
            handleChangeText={(e) =>
              setForm({ ...form, phone_number: formatPhoneNumber(e) })
            }
            otherStyles="mt-7"
            keyboardType="phone-pad"
            placeholder="(xxx) xxx-xxxx"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            //secureTextEntry={true}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Login
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
