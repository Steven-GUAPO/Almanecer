import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CartLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="cart"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default CartLayout