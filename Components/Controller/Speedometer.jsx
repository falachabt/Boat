import React from 'react';
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
    DangerPath,
  } from 'react-native-cool-speedometer';

const SpeedometerComponent = ({speed = 0}) => {
  return (
    <Speedometer
    value={speed}
    fontFamily='squada-one'
  >
    <Background />
    <Arc/>
    <Needle/>
    <Progress/>
    <Marks/>
    <DangerPath/>
    <Indicator/>
  </Speedometer>
  );
};

export default SpeedometerComponent;
