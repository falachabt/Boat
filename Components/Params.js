import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../utils/colors";
import GameContext from "../contexts/GameContext";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AntDesign } from "@expo/vector-icons";

const MyModal = () => {
  const { connected } = useContext(GameContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(!connected);
  }, [connected]);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.radioContainer}>
              <Text style={styles.label}>Can not link with the boat</Text>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text>
                <AntDesign name="disconnect" size={24} color={colors.alerts} />
              </Text>
            </View>

            <View style={styles.radioContainer}>
              <Text style={styles.label}> Check if the boat is on </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    gap: 20,
  },
  modalContent: {
    backgroundColor: colors.main,
    borderColor: colors.accent,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 450,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.text,
    width: "50%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: colors.text,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    padding: 9,
  },
  radioButton: {
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    color: colors.text,
  },
  radioTextSelected: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "blue",
  },
});

export default MyModal;
