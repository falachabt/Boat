import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { colors } from "../utils/colors";
import Temperature from "./Temperature";
import Statut from "./Statut";
import Battery from "./Battery";
import MyModal from "./Params";
import GameContext from "../contexts/GameContext";

const HeaderBar = () => {
  const { mode, ip, deviceName } = useContext(GameContext)
  return (
    <View style={styles.container}>
     
       <Statut/> 
       <View style={{display: "flex", flexDirection: "row" , alignItems: "center" , gap: 10}}>
        <Battery /> 
       <Temperature /> 
       <MyModal /> 
        </View> 
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.main,
    color: colors.text,
    borderBottomColor: colors.borders, 
    borderBottomWidth: 1, 
    paddingHorizontal: 5, 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    color: colors.text
  }
});
