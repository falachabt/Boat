import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import Joystick from "./Controller/Joystick";
import { FontAwesome5 } from "@expo/vector-icons";
import { updateSpeed } from "../api/updateDirection";

import axios from "axios";

export default class Command extends Component {
  constructor() {
    super();
    this.state = {
      joystick: {
        forward: 0,
        backward: 0,
        left: 0,
        right: 0,
      },
      pressed: false,
    };

    this.onSpeedUpChange = this.onSpeedUpChange.bind(this);
  }

  async onSpeedUpChange(values) {
   

    const value = parseInt( Math.abs(values.y))
    try {
      console.log(value)
      // const response = await axios.post(`http://192.168.108.226/propulstion?speed=${value}`, { value: 120 }, { timeout: 5000 });
      // console.log(response.data);
    } catch (error) {
      // console.error("AxiosError:", error);
    }
   

    this.setState({
      joystick: {
        propulsion:  values.y,
        direction: values.x,
        pressed: values.presseds
      },
      pressed: values.pressed,
    });
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Boat Params</Text>
          <Text> { this.state.joystick.propulsion } </Text>
          <Text> { this.state.joystick.direction } </Text>

          {/* <Text>https://youtu.be/duJkeYCjwBE?si=6EZRGtyKHqb2MMc_</Text> */}
          <View>
            <FontAwesome5
              name="temperature-high"
              size={24}
              color="rgba(39, 176, 245, 1)"
            />
            <Text> 20 °C</Text>
          </View> 
        </View>
        <Text>{this.state.joystick.propulsion}</Text>
        <Joystick onChange={this.onSpeedUpChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(39, 176, 245, 0.05)",
    opacity: 0.9,
  },
});
