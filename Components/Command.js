import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import Action from "./Controller/Action";
import Joystick from "./Controller/Joystick";
import { colors } from "../utils/colors";
import axios from "axios";
import { debounce } from "lodash";
import GameContext from "../contexts/GameContext";
import SpeedometerComponent from "./Controller/Speedometer";
import { map } from "../utils/fonctions";

const Command = () => {
  const [joystick, setJoystick] = useState({
    forward: 0,
    backward: 0,
    left: 0,
    right: 0,
  });
  const [pressed, setPressed] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [prevSpeed, setPrevSpeed] = useState(0);
  const [direction, setDirection] = useState(90);
  const [prevDir, setPrevDirection] = useState(90);
  const context = useContext(GameContext);

  const actions = [
    {
      name: "C",
      activeAction: () => console.log("Power On"),
      inactiveAction: () => console.log("Power Off"),
      icon: <Ionicons name="power" size={24} color="white" />,
    },
    {
      name: "C",
      icon: <AntDesign name="sound" size={24} color="white" />,
      activeAction: () => console.log("Claxonner activé"),
      inactiveAction: () => console.log("Claxonner désactivé"),
    },
    {
      name: "C",
      activeAction: () => console.log("Claxonner activé"),
      inactiveAction: () => console.log("Claxonner désactivé"),
    },
    {
      name: "C",
      activeAction: () => console.log("Claxonner activé"),
      inactiveAction: () => console.log("Claxonner désactivé"),
    },
    {
      name: "Allumer les feux",
      icon: <FontAwesome5 name="lightbulb" size={24} color={colors.text} />,
      activeAction: async () =>
        await axios.post(
          `${context.url}/clacks?state=1`,
          { state: 1 },
          { timeout: 5000 }
        ),
      inactiveAction: async () =>
        await axios.post(
          `${context.url}/clacks?state=0`,
          { state: 0 },
          { timeout: 5000 }
        ),
    },
    {
      name: "C",
      icon: <FontAwesome name="hand-stop-o" size={24} color="white" />,
      activeAction: () => console.log("Claxonner activé"),
      inactiveAction: () => console.log("Claxonner désactivé"),
    },
    {
      name: "C",
      activeAction: () => console.log("Claxonner activé"),
      inactiveAction: () => console.log("Claxonner désactivé"),
    },
    {
      name: "C",
      activeAction: () => console.log("Claxonner activé"),
      inactiveAction: () => console.log("Claxonner désactivé"),
    },
  ];

  async function sendSpeed(_speed) {
    try {
      console.log("proulsionsended");
      await axios.post(
        `${context.url}/propulsion?speed=${_speed}`,
        { speed: _speed },
        { timeout: 5000 }
      );
    } catch (e) {}
  }

  async function sendDir(_dir) {
    try {
      console.log("direction sended");
      await axios.post(
        `${context.url}/direction?value=${_dir}`,
        { value: _dir },
        { timeout: 5000 }
      );
    } catch (error) {}
  }

  useEffect(() => { sendSpeed(speed) }, [speed]);

  useEffect(() => {sendDir(direction)}, [direction]);

  const onSpeedUpChange = useCallback(
    debounce(async (values) => {
      values.y = -1 * values.y;
      let consigne_angle;
      let x = values.x;
      let y = values.y;
      let _speed = 2 * Math.sqrt(x * x + y * y);

      let angle = parseInt(90 - Math.atan2(y, x) * (180 / Math.PI));
      if (angle > 180 && angle < 270) {
        angle = map(angle, 270, 180, -90, -180);
      }

      if (angle == 90 || angle == 180) {
        if (angle == 90) {
          consigne_angle = 90;
        } else {
          consigne_angle = prevDir > 0 && prevDir < 90 ? 35 : 155;
        }
      } else if (angle < 0 && angle > -180) {
        if (angle < -90) {
          consigne_angle = 35;
        } else {
          consigne_angle = map(angle, -90, 0, 35, 90);
        }
      } else {
        if (angle > 90) {
          consigne_angle = 155;
        } else {
          consigne_angle = map(angle, 0, 90, 90, 155);
        }
      }

      _speed = parseInt(_speed)
      consigne_angle = parseInt(consigne_angle);

      console.log(speed != _speed)

      setSpeed(_speed);
      if(_speed != speed){
      }

      setPrevDirection(consigne_angle);
      if(direction != consigne_angle){
        setDirection(consigne_angle)
      }

    

     
    }, 100),
    [joystick]
  );

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <View style={styles.actionsButtons}>
          {actions.map((action, index) => (
            <Action
              key={index}
              name={action.name}
              icon={action.icon}
              activeAction={action.activeAction}
              inactiveAction={action.inactiveAction}
            />
          ))}
        </View>
        <Joystick onChange={onSpeedUpChange} />
        {/* <Thermostat speed={speed} /> */}
      </View>
      <View style={styles.visualContainer}>
        <View style={{ height: 200 }}>
          <SpeedometerComponent speed={speed} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.main,
    color: colors.text,
    opacity: 0.98,
    flexDirection: "row",
    padding: 5,
  },
  actionsContainer: {
    flex: 0.5,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "",
    alignItems: "center",
  },
  actionsButtons: {
    flex: 0.5,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  visualContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: colors.text,
  },
});

export default Command;
