import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../utils/colors";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function Temperature()  {
  const [data, setData] = useState(null); // Initial state for data
  
  const apiUrl = 'http://192.168.169.226/temperature';

  const fetchData = async () => {

    try {
      const response = await axios.get(apiUrl);
      setData(response.data); // Update data state with the fetched data
    } catch (err) {
      console.error('Error fetching data:', err);
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
        <Text style={{ display: "flex", alignItems: "flex-end",  gap: 2 }}>
          <FontAwesome5
            name="temperature-high"
            size={24}
            color={colors.accent}
          />
          <Text style={{color: colors.text, marginBottom: 5 }} > { data ? data.temperature : "0" }°C</Text>
          {/* <Text> { JSON.stringify(data)}</Text> */}
        </Text>
        <Text style={{ display: "flex", alignItems: "center",  gap: 2 }}>
        <Ionicons name="water" size={24} color={colors.accent} />
          <Text style={{color: colors.text, marginBottom: 5 }} > { data ? data.humidity : "0" }%</Text>
        </Text>
      </View>
    );
}
