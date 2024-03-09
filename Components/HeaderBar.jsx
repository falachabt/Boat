import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import Temperature from "./Temperature";

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HeaderBar</Text>
       <Temperature /> 
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
