
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import React, { Component, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../utils/colors";
import GameContext from "../contexts/GameContext";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function Battery()  {
  const [data, setData] = useState(null); // Initial state for data
  const {  apiKey, url2 } = useContext(GameContext)
  const apiUrl = `${url2}/battery`;

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey
        }
      });
      setData(response.data); 
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{  }}
    >
      <View style={{ display: "flex", flexDirection: "row",  justifyContent: "center",  alignItems: "center", gap: 8 }}>
        <Text>
        {data?.level && data?.level > 12 ? (
          <Ionicons name="battery-full" size={24}  color={colors.accent} />
          ) : (
            <Ionicons
            name="battery-full-outline"
            size={24}
            color={colors.alerts}
            />
            )}
            </Text> 

        <Text style={{ color: colors.text, marginBottom:3 }}>
          {data ? data?.level : "0"}%
        </Text>
      </View>
    </View>
  );
}
