import React from "react";
import { render } from "react-dom";
import  *  as FontAwesome from 'react-icons/fa';

const Icon = props => {
  const { iconName, size, color } = props;
  const icon = React.createElement(FontAwesome[iconName]);
  return (
    <div style={{ fontSize: size, color: color, marginTop: '5px', display: 'inline-block' }}>{icon}</div>
  );
};

export default Icon