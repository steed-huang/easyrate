import React from "react";
import "./item.css";

// this component could be replaced with a normal button...
// but just in case I find a use for it, I will leave it as is :)
export default function Item({ item, updateFunc }) {
  return (
    <button onClick={updateFunc} className="select-button">
      <div>{item.name}</div>
      <img className="anime-image" alt="anime cover" src={item.img} />'
    </button>
  );
}
