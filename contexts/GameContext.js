import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const GameContext = createContext({ ip :"192.168.240.226", url : "http://192.168.240.226" });

// Create a provider component
export const GameProvider = ({ children }) => {
    const [ip, setIp] = useState('192.168.240.226'); // Initial ip state
  const [url, setUrl] = useState(`http://${ip}`); // Initial url state
  const [connected, setConnected] = useState(false)
  const [mode, setMode] = useState("Wifi")
  const [deviceName, setDeviceName ] = useState("")


  useEffect( () => {
    setUrl(`http://${ip}`)
  }, [ip] );

  return (
    <GameContext.Provider value={{ url, setUrl, ip, setIp, connected, setConnected, mode, setMode, deviceName, setDeviceName }}>
      {children}
    </GameContext.Provider>
  );
};


export default GameContext;
