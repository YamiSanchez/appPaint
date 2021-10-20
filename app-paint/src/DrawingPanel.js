import React, { useRef } from "react";
import "./drawingPanel.css";
import Row from "./Row";
import html2canvas from 'html2canvas'

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props;
  const panelRef = useRef();
  let rows = [];
  const printRef = useRef();

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
  }

  function handlePrint(event) {
    printRef.current.innerHTML = '';
    html2canvas(panelRef.current).then(function(canvas) {
      printRef.current.appendChild(canvas);
    });
  }

  return (
    <div id="drawingPanel">
    
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      <button className="button" onClick={handlePrint}>
        Print
      </button>
      <div ref={printRef}></div>

    </div>
  );
}