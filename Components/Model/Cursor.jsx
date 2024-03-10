import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withRepeat
} from "react-native-reanimated";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text } from "react-native";

const VehicleCursor = ({ speed, rotation }) => {
  const position = useSharedValue(0);

  React.useEffect(() => {
    position.value = withTiming(speed, { duration: 100 });
  }, [speed]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // { translateY: -1 * position.value },
        { rotateZ: `${rotation - 135}deg` },
      ],
    };
  });

  return (
    <View>
      <Animated.View style={[styles.cursor, animatedStyle]}>
        <Text>
          <SimpleLineIcons name="cursor" size={70} color="white" />
        </Text>
      </Animated.View>
      
    </View>
  );
};



export default VehicleCursor;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  road: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 50,
    height: 5000, 
    backgroundColor: 'red',
    borderTopWidth: 1,
    borderTopColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  cursor: {
    width: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 50,
    position: "absolute",
  },
});



