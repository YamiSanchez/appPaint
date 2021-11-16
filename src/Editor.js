import React, { useState, useEffect } from "react";
import "./editor.css";
import { CompactPicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import axios from "axios";
import imgLoading from './loading.gif';
import imgError from './error.gif'

export default function Editor() {
  const [panelWidth, setPanelWidth] = useState(30);
  const [panelHeight, setPanelHeight] = useState(30);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("start drawing");
  const [selectedColor, setColor] = useState('#');
  const [mouseDown, setMouseDown] = useState(false);
  const [loading, setLoading] = useState('idle');
  const [colorRandom, setColorRandom] = useState([]);

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);

    if(buttonText === "start drawing") {
      coloresRandom();
      setButtonText("reset")
    }
    else {
      setButtonText("start drawing");
      setLoading('idle');
    }

  }

  function changeColor(color) {
    setColor(color.hex);
  }

  document.body.onmousedown = function() {
    setMouseDown(true);
  }

  document.body.onmouseup = function() {
    setMouseDown(false);
  }

  const coloresRandom = async () => {
    axios.get('https://www.colr.org/json/colors/random/46').then(response => {
      setLoading('Loading');
      const generador = response.data.matching_colors.map((value) => {
        return '#' + value;
      });
      const filtro = generador.filter(element => {
        return element !== '#';
      });
      const colorArreglo = [];
      for(let i=0; i<36; i++) {
        colorArreglo.push(filtro[i]);
      }
      setColorRandom(colorArreglo);
      setLoading('Complete');
    }).catch(() => {
      alert("Error al cargar paleta de colores");
      setLoading('Error');
    })
  }

  useEffect(() => { coloresRandom()}, [hideOptions]);

  return (
    <div id="editor">
      <h1>Pixel Editor</h1>
      {hideDrawingPanel && <h2>Enter Panel Dimensions</h2>}
      {hideDrawingPanel && (
        <div id="options">
          <div className="option">
            <input
              type="number"
              className="panelInput"
              defaultValue={panelWidth}
              onChange={(e) => {
                setPanelWidth(e.target.value);
              }}
            />
            <span>Width</span>
          </div>
          <div className="option">
            <input
              type="number"
              className="panelInput"
              defaultValue={panelHeight}
              onChange={(e) => {
                setPanelHeight(e.target.value);
              }}
            />
            <span>Height</span>
          </div>
        </div>
      )}

      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>


      {loading === 'Loading' && <div>
        <img src={imgLoading} alt='loading'></img>
      </div>}
      {loading === 'Error' && <div>
        <img src={imgError} alt='error'></img>
        <h2>Error al cargar los colores</h2>
      </div>}
      {loading === 'Complete' && hideOptions && 
      <CompactPicker color={selectedColor} colors={colorRandom} onChangeComplete={changeColor} 
      />}

      {loading === 'Complete' && hideOptions &&
        <DrawingPanel
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
          mouseDown={mouseDown}
        />}

    </div>
  );
}