import React from 'react'
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CheckoutLayout = () => {
  return (
    <>
          <Stack>
            <Stack.Screen
              name="checkout"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="deliveryaddress"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="orderconfirmation"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ordersscreen"
              options={{
                headerShown: false,
              }}
            />

          </Stack>
    
          <StatusBar backgroundColor="#161622" style="light" />
        </>
  )
}

export default CheckoutLayout