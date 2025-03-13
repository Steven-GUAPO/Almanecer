import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LottieView from "lottie-react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { loginUser } from "../../backend/api";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email_id: "",
    password: "",
  });

  const submit = async () => {
    const { email_id, password } = form;
    if (email_id === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    try {
      const result = await loginUser({email_id, password});
        setUser(result);
        setIsLogged(true);
  
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
            Log in
          </Text>

          {/* Lottie Animation - Positioned Below "Log in" Title */}
          <View className="w-full flex items-center justify-center my-4">
            <LottieView
              source={require("../../assets/animations/foodies.json")}  // Replace with your Lottie file
              autoPlay
              loop
              className="w-60 h-40"  // Adjusted for better visibility
            />
          </View>

          <FormField
            title="Email"
            value={form.email_id}
            handleChangeText={(e) => setForm({ ...form, email_id: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
