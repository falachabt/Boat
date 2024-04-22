import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const GameContext = createContext({
  ip: "192.168.4.1",
  url: "http://192.168.4.1",
  url2: "http://192.168.4.1:81",
  handsOn: false,
  on: false, 
  setOn:  () => {},  
  setHandsOn: () => {},
  mode: "Wifi",
  deviceName: "",
  connected: false,
  apiKey: 123456789,
  sendRequest: () => {},
  requestWithIncome: () => {},
  clacks : 0, 
  setClacks:  () => {} 
});

// Create a provider component
export const GameProvider = ({ children }) => {
  const [ip, setIp] = useState("192.168.4.1"); // Initial ip state
  const [ip2, setIp2] = useState(`${ip}`); // Initial ip state
  const [url, setUrl] = useState(`http://${ip}`); // Initial url state
  const [url2, setUrl2] = useState(`http://${ip2}`); // Initial url state
  const [connected, setConnected] = useState(false);
  const [mode, setMode] = useState("Wifi");
  const [on, setOn] = useState(false)
  const [deviceName, setDeviceName] = useState("");
  const [handsOn, setHandsOn] = useState(false);
  const [clacks, setClacks] = useState(0);
  const apiKey = 123456789;

  const requestWithIncome = async (url, method, data) => {
    try {
      const response = await axios({
        method: method,
        url: url2,
        // data: data,
        headers: {
          Authorization: apiKey,
        },
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // rethrow the error for further handling if needed
    }
  };

  const sendRequest = async (url, method, data) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        // data: data,
        headers: {
          Authorization: apiKey,
        },
        timeout: 500,
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // rethrow the error for further handling if needed
    }
  };

  useEffect(() => {
    setUrl(`http://${ip}`);
    setUrl2(`http://${ip}`);
  }, [ip]);

  return (
    <GameContext.Provider
      value={{
        sendRequest,
        url,
        url2,
        clacks, 
        setClacks, 
        
        setUrl,
        ip,
        setIp,
        connected,
        setConnected,
        mode,
        setMode,
        deviceName,
        setDeviceName,
        handsOn,
        setHandsOn,
        apiKey,
        requestWithIncome,
        on, 
        setOn
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
