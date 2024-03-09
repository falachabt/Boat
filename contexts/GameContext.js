import React, { createContext, useEffect, useState } from 'react';

// Create a context
const GameContext = createContext({ ip :"192.168.169.226", url : "http://192.168.169.226" });

// Create a provider component
export const GameProvider = ({ children }) => {
    const [ip, setIp] = useState('192.168.169.226'); // Initial ip state
  const [url, setUrl] = useState(`http://${ip}`); // Initial url state


  useEffect( () => {
    setUrl(`http://${ip}`)
  }, [ip] );

  return (
    <GameContext.Provider value={{ url, setUrl, ip, setIp }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
