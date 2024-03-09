import { View, Text } from "react-native";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";

const Boat3D = () => {
  return (
    <Canvas>
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>

      <pointLight position={[10, 10, 10]} />
      <mesh
        onClick={(e) => console.log("click")}
        onContextMenu={(e) => console.log("context menu")}
        onDoubleClick={(e) => console.log("double click")}
        onWheel={(e) => console.log("wheel spins")}
        onPointerUp={(e) => console.log("up")}
        onPointerDown={(e) => console.log("down")}
        onPointerOver={(e) => console.log("over")}
        onPointerOut={(e) => console.log("out")}
        onPointerEnter={(e) => console.log("enter")} // see note 1
        onPointerLeave={(e) => console.log("leave")} // see note 1
        onPointerMove={(e) => console.log("move")}
        onPointerMissed={() => console.log("missed")}
        onUpdate={(self) => console.log("props have been updated")}
      >
        <sphereGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};

export default Boat3D;
