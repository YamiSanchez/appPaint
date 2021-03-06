import React from "react";
import "./row.css";
import Pixel from "./Pixel";

export default function Row(props) {
  const { width, selectedColor, mouseDown } = props;

  let pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} mouseDown={mouseDown} />);
  }

  return <div className="row">{pixels}</div>;
}