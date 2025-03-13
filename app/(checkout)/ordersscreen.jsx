import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ordersByCustomer } from "../../backend/orders";
import { router } from "expo-router";
import OrderDetailsModal from "../../Modals/OrderDetailsModal"; // Import the modal

const OrdersScreen = () => {
  const { user } = useGlobalContext();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    // Fetch orders for this user
    const fetchOrders = async () => {
      try {
        const data = await ordersByCustomer(user._id);
        setOrders(data || []);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const closeModal = () => {
    console.log("here")
    setModalVisible(false)
  }

  return (
    <SafeAreaView className="bg-white h-full px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.replace("/menu")}>
          <Text className="text-lg font-bold">{"<"}</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="py-4 border-b border-gray-200 flex-row justify-between items-center"
            onPress={() => {
              setSelectedOrder(item);
              setModalVisible(true);
            }}
          >
            <View>
              <Text className="text-black font-semibold">{`Order #${item._id}`}</Text>
              <Text className="text-gray-600">{`${formatDate(item.order_date)}`}</Text>
              <Text className="text-gray-500">{`${item.cart_summary.length} items`}</Text>
            </View>
            <Text className="text-gray-400 text-xl">{">"}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text>You don't have any orders yet.</Text>
          </View>
        )}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal 
        visible={modalVisible} 
        order={selectedOrder} 
        onClose={() => closeModal()} 
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
