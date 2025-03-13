import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import {CACHE_ID_KEY} from "@env"
import { removeFromSecureStore } from "../../backend/secureCache";
import { CustomButton } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    setUser(null);
    setIsLogged(false);
    try{
        await removeFromSecureStore(CACHE_ID_KEY); 
    }catch(error){
      console.log("Error removing id from cache:", error);
    }
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <ScrollView>
      {/* Header with Logout Icon */}
      <View className="flex-row justify-between items-center mt-6 mb-4">
        <Text className="text-xl font-semibold text-gray-100">Profile</Text>
        <TouchableOpacity onPress={logout}>
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
          <Text className="text-black text-lg">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Lottie Animation - Centered below Profile Title */}
      <View className="w-full flex items-center justify-center my-4">
          <LottieView
            source={require("../../assets/animations/Profile.json")} // Replace with your Lottie file
            autoPlay
            loop
            className="w-40 h-40"
          />
        </View>

      {/* Profile Information without container box */}
      <View className="w-full mt-10">
        {/* Name Row */}
        <Text className="text-gray-100 text-lg mb-1">Name</Text>
        <View className="flex-row justify-between mb-6">
          <View className="flex-1 bg-gray-100 p-4 rounded-2xl mr-2 border-2 border-gray-200">
            <Text className="text-black text-lg">{user?.first_name || "First Name"}</Text>
          </View>
          <View className="flex-1 bg-gray-100 p-4 rounded-2xl ml-2">
            <Text className="text-black text-lg">{user?.last_name || "Last Name"}</Text>
          </View>
        </View>

        {/* Email Field */}
        <Text className="text-gray-100 text-lg mb-1">Email</Text>
        <View className="bg-gray-100 p-4 rounded-2xl mb-6">
          <Text className="text-black text-lg">{user?.email_id || "Email"}</Text>
        </View>

        {/* Phone Number Field */}
        <Text className="text-gray-100 text-lg mb-1">Phone Number</Text>
        <View className="bg-gray-100 p-4 rounded-2xl mb-6">
          <Text className="text-black text-lg">{user?.phone_number || "Phone Number"}</Text>
        </View>

      </View>
      </ScrollView>
      <CustomButton
          title={`My Orders`}
          handlePress={() => router.replace("/ordersscreen")}
          containerStyles="mt-7 mb-4"
        />
    </SafeAreaView>
  );
};

export default Profile;
