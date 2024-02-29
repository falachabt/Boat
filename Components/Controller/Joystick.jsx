import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Joystick = (props) => {
  const pressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const [values, setValues] = useState(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
      runOnJS(props.onChange)({
        x: offsetX.value,
        y: offsetY.value,
        pressed: pressed.value,
      });
    })
    .onChange((event) => {
      let x = event.translationX;
      let y = event.translationY;

      
      offsetX.value = x < -120 ? -120 : x > 120 ? 120 : x;
      offsetY.value = y < -80 ? -80 : y > 80 ? 80 : y;

      runOnJS(props.onChange)({
        x: offsetX.value,
        y: offsetY.value,
        pressed: pressed.value,
      });
    })
    .onFinalize(() => {
      offsetX.value = 0;
      offsetY.value = 0;
      pressed.value = false;
      runOnJS(props.onChange)({
        x: 0,
        y: 0,
        pressed: pressed.value,
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      // { scale: withTiming(pressed.value ? 0.9 : 1) },
    ],
    backgroundColor: "rgba(39, 176, 245, 1)",
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}></View>
      <View style={styles.controlArea}>
        <GestureDetector gesture={pan}>
        
          <Animated.View style={[styles.circle, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    alignItems: "cente",
    justifyContent: "flex-end",
    height: "100%",
  },
  controlArea: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    borderRadius: 10,
    height: 160,
    width: "30%",
    marginBottom: 10,
    marginLeft: 10,
  },
  circle: {
    height: 80,
    width: 80,
    backgroundColor: "#b58df1",
    borderRadius: 500,
    cursor: "grab",
  },
});
export default Joystick;
