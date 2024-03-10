import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../utils/colors";
import GameContext from "../contexts/GameContext";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function Statut()  {
  const {  url, connected, setConnected, mode  } = useContext(GameContext)
  
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setConnected(true)
    } catch (err) {
      setConnected(false)
    } finally {
    }
  };

 

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(fetchData, 3000); 

    return () => clearInterval(intervalId); 
  }, []); 

    
    return (
      <View style={{display: "flex", flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center"}}>

      <View style={ {  marginLeft: 15,   height: 10, width: 10, borderRadius: 99, backgroundColor : connected ? "green" : "red" } }>
      </View>
        <Text style={{color: "white"}} > {mode}</Text> 
      </View> 
    );
}
