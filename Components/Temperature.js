import React, { Component } from "react";
import { Text, View } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Temperature()  {
    
    return (
      <View>
        <Text style={{ display: "flex", gap: 2 }}>
          <FontAwesome5
            name="temperature-high"
            size={24}
            color="rgba(39, 176, 245, 1)"
          />
          <Text> 20 °C</Text>
        </Text>
      </View>
    );
}
