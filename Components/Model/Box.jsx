import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';




const Box = (props) => {
  const mesh = useRef();
  const [state, setState] = useState({ isHovered: false, isActive: false });

  const gltf = useLoader(GLTFLoader,require('./assets/boat.gltf'));
  useFrame((state, delta) => (mesh.current.rotation.y += delta));
  
  
  return <primitive object={gltf.scene} />
};

export default Box;
