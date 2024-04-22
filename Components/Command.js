import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Action from "./Controller/Action";
import Joystick from "./Controller/Joystick";
import { colors } from "../utils/colors";
import axios from "axios";
import { debounce } from "lodash";
import GameContext from "../contexts/GameContext";
import SpeedometerComponent from "./Controller/Speedometer";
import { map } from "../utils/fonctions";
import VehicleCursor from "./Model/Cursor";
import { WebView } from "react-native-webview";

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
  const sendRequest = context.sendRequest;

  const sendClacksState = async (state) => {
    // const url = `${context.url}/clacks?state=${state}`;
    context.setClacks(state)
  };

  const actions = [
    {
      name: "C",
      activeAction: () => context.setOn(true),
      inactiveAction: () => context.setOn(false),
      icon: <Ionicons name="power" size={24} color="white" />,
    },
    {
      name: "C",
      icon: <FontAwesome5 name="lightbulb" size={24} color={colors.text} />,
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
      icon: <AntDesign name="sound" size={24} color="white" /> ,
      activeAction: async () => await sendClacksState(1),
      inactiveAction: async () => await sendClacksState(0),
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

  const actions2 = [
    {
      name: "C",
      icon: <FontAwesome name="hand-stop-o" size={24} color="white" />,
      activeAction: () => context.setHandsOn(true),
      inactiveAction: () => context.setHandsOn(false),
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
      name: "C",
      activeAction: () => console.log("Claxonner activé"),
      inactiveAction: () => console.log("Claxonner désactivé"),
    },
  ];

  async function sendSpeed(_speed) {
    try {
      console.log("propulsion sent");
      const url = `${context.url}/propulsion?speed=${_speed}`;
      await sendRequest(url, "GET", { speed: _speed });
      console.log("sended");
    } catch (error) {
      // console.error('Error:', error);
    }
  }

  async function sendDir(_dir) {
    try {
      console.log("direction sent");
      const url = `${context.url}/direction?value=${_dir}`;
      await sendRequest(url, "GET", { value: _dir });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // useEffect(() => {
  //  sendSpeed(speed)
  //  sendDir(direction)

  // return  () => {
 
  // } 
  // }, [speed, direction]);

  useEffect(() => {
    // sendDir(direction);
  }, [direction]);

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

      _speed = parseInt(_speed);

      consigne_angle = parseInt(consigne_angle);

      console.log(_speed);
      console.log(consigne_angle);


      setSpeed(_speed);
      if (_speed != speed) {
      }

      setPrevDirection(consigne_angle);
      setDirection(consigne_angle);
    }, 2),
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
        <View style={{ flex: 0.5 }}>
          <Joystick onChange={onSpeedUpChange} />
        </View>
        {/* <Thermostat speed={speed} /> */}
      </View>
      <View style={styles.visualContainer}>
        <View style={{ flex: 1 }}>
          <VehicleCursor speed={speed} rotation={direction} />
          <View style={{ display: "none" }}>
            <WebView
            renderError={ (error) => {} }
              source={{ uri: `${context.url}/propulsion?speed=${ parseInt(map(speed, 0, 180, 0, 180))}` }}
            />
            <WebView
            renderError={ (error) => {} }
              source={{ uri: `${context.url}/direction?value=${direction}` }}
            />
            <WebView
            renderError={ (error) => {} }
              source={{ uri: `${context.url2}/clacks?state=${context.clacks}` }}
            />
            <WebView
            renderError={ (error) => {} }
              source={{

                uri: `${context.url}/start?state=${context.on ? 1 : 0}`,
              }}
            /> 
          </View>
        </View>
        <View style={{ height: 200 }}>
          <SpeedometerComponent speed={speed} />
          <View style={styles.actionsButtons}>
            {actions2.map((action, index) => (
              <Action
                key={index}
                name={action.name}
                icon={action.icon}
                activeAction={action.activeAction}
                inactiveAction={action.inactiveAction}
              />
            ))}
          </View>
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
    // display: "flex",
    // flexDirection: "column",
    // flexWrap: "wrap",
    // justifyContent: "flex-start",
    // alignItems: "center",
  },
  actionsButtons: {
    flex: 0.4,
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
    justifyContent: "flex-end",
    padding: 10,
    alignItems: "center",
  },
  text: {
    color: colors.text,
  },
});

export default Command;
