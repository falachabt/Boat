import React, { useContext, useState } from "react";
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

const MyModal = () => {
  const { mode, setMode, deviceName, setDeviceName, ip, setIp} = useContext(GameContext)
    const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState( mode == "Wifi" ? ip : deviceName );
  const [selectedOption, setSelectedOption] = useState(mode);


  const handleInputChange = (text) => {
    setTextInputValue(text);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    // You can do something with the input value and selected option here

    if(selectedOption == "Wifi"){
        setIp(textInputValue)
    }else{
        setDeviceName(textInputValue)
    }

    setMode(selectedOption)
  };

  return (
    <View style={styles.container}>
      <Text style = {{ paddingVertical: 4, paddingHorizontal: 4, backgroundColor: colors.secondaryBackground , borderRadius: 5 }} onPress={() => setModalVisible(true)}>
        {" "}
        <Ionicons name="settings-sharp" size={24} color={colors.accent} />{" "}
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.radioContainer}>
              <Text style={{ marginRight: 10 , color: colors.text}}> Mode : </Text>
              <View style={styles.radioButton}>
                <Text
                  onPress={() => handleOptionChange("Wifi")}
                  style={
                    selectedOption === "Wifi"
                      ? styles.radioTextSelected
                      : styles.radioText
                  }
                >
                  Wifi
                </Text>
              </View>
              <View style={styles.radioButton}>
                <Text
                  onPress={() => handleOptionChange("Bluetooth")}
                  style={
                    selectedOption === "Bluetooth"
                      ? styles.radioTextSelected
                      : styles.radioText
                  }
                >
                  Bluetooth
                </Text>
              </View>
            </View>
            <Text style={styles.label}>
              {" "}
              {selectedOption == "Wifi"
                ? "Enter Ip Adress"
                : "Enter device name"}{" "}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange}
              value={textInputValue}
              placeholder= { mode == "Wifi" ? "eg:192.168.240.226" : "eg:My Boat"}
              defaultValue={ mode == "Wifi" ? ip  : deviceName }
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 15,
              }}
            >
              <Button
                title="Close"
                onPress={ () => { setModalVisible(false);} }
                style={{ flex: 1 }}
                color={colors.alerts}
              />
              <Button
                title="Save"
                onPress={handleModalClose}
                color={colors.accent}
              />
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
    color: colors.text
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: colors.text
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent, 
    padding: 9
  },
  radioButton: {
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    color: colors.text
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
