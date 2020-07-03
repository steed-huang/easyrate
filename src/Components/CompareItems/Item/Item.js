import React from "react";
import "./item.css";

export default function Item({ item, updateFunc }) {
  return (
    <button onClick={updateFunc} className="select-button">
      {item.name}
    </button>
  );
}
