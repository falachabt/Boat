import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const GameContext = createContext({ ip :"192.168.4.1", url : "http://192.168.4.1", handsOn : false, setHandsOn:  () => {},   mode : "Wifi", deviceName: "", connected: false, apiKey: 123456789, sendRequest :  () => {}  });

// Create a provider component
export const GameProvider = ({ children }) => {
    const [ip, setIp] = useState('192.168.4.1'); // Initial ip state
  const [url, setUrl] = useState(`http://${ip}`); // Initial url state
  const [connected, setConnected] = useState(false)
  const [mode, setMode] = useState("Wifi");
  const [deviceName, setDeviceName ] = useState("");
  const [handsOn, setHandsOn] = useState(false)
  const apiKey = 123456789

  
  const sendRequest = async (url, method, data) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: apiKey
        },
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // rethrow the error for further handling if needed
    }
  };

  useEffect( () => {
    setUrl(`http://${ip}`)
  }, [ip] );

  return (
    <GameContext.Provider value={{ sendRequest,  url, setUrl, ip, setIp, connected, setConnected, mode, setMode, deviceName, setDeviceName, handsOn, setHandsOn, apiKey }}>
      {children}
    </GameContext.Provider>
  );
};


export default GameContext;
