import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import AxiosHttpClient from "@/utils/AxiosHttpClient";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    AxiosHttpClient.init("http://172.16.120.24:7005/api/");

    setTimeout(() => {
      setAppReady(true);
    }, 100);

    return () => {};
  }, []);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      {isAppReady && (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      )}
    </View>
  );
}
