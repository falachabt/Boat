import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Constants } from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import Auto from "./Components/Auto";
import Command from "./Components/Command";
import Setting from "./Components/Setting";
import { colors } from "./utils/colors";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderBar from "./Components/HeaderBar";

import { useEffect } from "react";
import { GameProvider } from "./contexts/GameContext";


// const Tabs = createBottomTabNavigator();
const Tabs = createStackNavigator();

export default function App() {
  
  return (
    <View style={styles.container}>
      <GameProvider>
        <HeaderBar />
        <NavigationContainer>
          <Tabs.Navigator screenOptions={{ headerShown: false }}>
            <Tabs.Screen
              name="Manual"
              component={Command}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return (
                    <Ionicons
                      name="game-controller"
                      size={size}
                      color={color}
                    />
                  );
                },
              }}
            ></Tabs.Screen>
            <Tabs.Screen
              name="Auto"
              component={Auto}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return (
                    <MaterialCommunityIcons
                      name="fan-auto"
                      size={size}
                      color={color}
                    />
                  );
                },
              }}
            ></Tabs.Screen>
            <Tabs.Screen
              name="Setting"
              component={Setting}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return <Ionicons name="settings" size={size} color={color} />;
                },
                tabBarActiveBackgroundColor: "lightblue",
              }}
            ></Tabs.Screen>
          </Tabs.Navigator>
        </NavigationContainer>

        <StatusBar style="dark" backgroundColor="white" hidden={true} />
      </GameProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    color: colors.text,
  },
});
