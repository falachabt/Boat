import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../utils/colors";
import GameContext from "../contexts/GameContext";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function Temperature()  {
  const [data, setData] = useState(null); // Initial state for data
  const { url } = useContext(GameContext)
  const apiUrl = `${url}/temperature`;

  const fetchData = async () => {

    try {
      const response = await axios.get(apiUrl);
      setData(response.data); // Update data state with the fetched data
    } catch (err) {
      // console.error('Error fetching data:', err);
    } finally {
    }
  };


  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(fetchData, 3000); 

    return () => clearInterval(intervalId); 
  }, []); 

    
    return (
      <View style={ {  padding: 4, display: "flex", flexDirection: "row", gap: 10 } }>
        <View style={{ display: "flex", flexDirection: "row",  alignItems: "center",  gap: 2 }}>
          <Text>
          <FontAwesome5
            name="temperature-high"
            size={24}
            color={colors.accent}
            />
            </Text> 
          <Text style={{color: colors.text, }} > { data ? data.temperature : "0" }°C</Text>
          {/* <Text> { JSON.stringify(data)}</Text> */}
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center",  gap: 2 }}>
          <Text>
        <Ionicons name="water" size={24} color={colors.accent} />
            </Text> 
          <Text style={{color: colors.text }} > { data ? data.humidity : "0" }%</Text>
        </View>
      </View>
    );
}
