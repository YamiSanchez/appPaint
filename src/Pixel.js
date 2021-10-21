import React, { useState } from "react";
import "./pixel.css";

export default function Pixel(props) {
  const { selectedColor, mouseDown } = props;

  const [pixelColor, setPixelColor] = useState("#fff");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  function applyColor(event) {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  }

  function changeColorOnHover(event) {
    setOldColor(pixelColor);
    setPixelColor(selectedColor);
  }

  function resetColor(event) {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }

    setCanChangeColor(true);
  }

  function handleOver(event) {
    if(mouseDown === true) {
      setPixelColor(selectedColor);
      setCanChangeColor(false);
    }
  }

  return (
    <div
      className="pixel"
      onClick={applyColor}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      style={{ backgroundColor: pixelColor }}
      onMouseOver={handleOver}
    ></div>
  );
}