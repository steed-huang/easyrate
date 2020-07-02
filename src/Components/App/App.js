import React from 'react';
import './App.css';
import ItemList from '../ItemList'

function App() {
  return (
    <>
      <div id="list_body" className="centered-flex">
        <ItemList/>
      </div>
      <div id="add_body" className="centered-flex">
        <input type="text" id="item_input"/>
        <button id="add_button"> Add Item </button>
        <button id="start_button"> Start Rating </button>
      </div>
    </>
  );
}

export default App;
