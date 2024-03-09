import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Action from "./Controller/Action";
import Joystick from "./Controller/Joystick";
import { colors } from "../utils/colors";
import axios from "axios";
import { debounce } from 'lodash';
import GameContext from "../contexts/GameContext";
import SpeedometerComponent from "./Controller/Speedometer";



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
    this.sendRequest = debounce(this.sendRequest, 500); 
    
    this.gameContext = GameContext; // Access the IP context

    this.actions = [
      {
        name: "C",
        // icon: <FontAwesome5 name="horn" size={24} color={colors.text} />,
        activeAction: () => console.log("Claxonner activé"),
        inactiveAction: () => console.log("Claxonner désactivé"),
      },
      {
        name: "Allumer les feux",
        icon: <FontAwesome5 name="lightbulb" size={24} color={colors.text} />,
        activeAction: async () => await axios.post(`${this.context.url }/clacks?state=1`, { state: 1 }, { timeout: 5000 }),
        inactiveAction:  async  () => await axios.post(`${this.context.url }/clacks?state=0`, { state: 0 }, { timeout: 5000 }),
      },
    ];
  }

  static contextType = GameContext;

  async onSpeedUpChange(values) {
 
    
    this.sendRequest(values);
  }

  async sendRequest(values) {
    const value = Math.abs(values.y);
    const dir = parseInt(Math.abs(values.x));

    this.setState({
      speed : value, 
      direction: dir, 
    });
  
    try {
      console.log("y :", value, "Yold : ", this.state.joystick.propulsion);
      const gap = Math.abs(value - Math.abs(this.state.joystick.propulsion));
      console.log("gapY : ", gap);
      console.log("x :", dir, 'Xold :', this.state.joystick.direction);
      const gap2 = Math.abs(dir - Math.abs(this.state.joystick.direction));
      console.log("gapX : ", gap2);
      if (gap > 0.8) {
        console.log("action inited");
        const propulsionRequest = axios.post(`${this.context.url}/propulsion?speed=${parseInt(value)}`, { value: parseInt(value) }, { timeout: 5000 });
        const directionRequest = axios.post(`${this.context.url}/direction?value=${dir}`, { value: dir }, { timeout: 5000 });
        const [propulsionResponse, directionResponse] = await Promise.all([propulsionRequest, directionRequest]);
      }
      // console.log(response.data);
    } catch (error) {
      // console.error("AxiosError:", error);
    }
  
    this.setState({
      joystick: {
        propulsion: values.y,
        direction: values.x,
        pressed: values.presseds,
      },
      pressed: values.pressed,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          {this.actions.map((action, index) => (
            <Action
              key={index}
              name={action.name}
              icon={action.icon}
              activeAction={action.activeAction}
              inactiveAction={action.inactiveAction}
            />
          ))}
        </View>
        <View style={styles.joystickContainer}>
          {/* <Text style={styles.text}>Boat Params</Text>
          <Text style={styles.text}>{this.state.joystick.direction}</Text> */}
          <Joystick onChange={this.onSpeedUpChange} />
           <SpeedometerComponent speed={Math.abs(this.state.speed.propulsion || 0)} /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.main,
    color: colors.text,
    opacity: 0.98,
    flexDirection: "column",
    padding: 5,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "",
    alignItems: "center",
  },
  joystickContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "",
    alignItems: "center",
  },
  text: {
    color: colors.text,
  },
});
