import React, { useState, useRef } from 'react';
import './App.css';
import ItemList from '../ItemList'
const { v4: uuidv4 } = require('uuid');

function App() {
  const [items, setItems] = useState([])
  const itemInputRef = useRef()

  var handleAddItems = e => { // add new item to list
    const name = itemInputRef.current.value
    if (name === "") return
    setItems(prevItems => {
      return [...prevItems, {id: uuidv4(), name: name, rating: 100}]
    })
    itemInputRef.current.value = null
  }

  var handleClearItems = e => { // add new item to list
    const newItems = []
    setItems(newItems)
  }

  return (
    <>
      <div id="list_body" className="centered-flex">
        <div id="list">
          <ItemList  itemList = {items} />
        </div>
      </div>
      
      <div id="add_body" className="centered-flex">
        <input ref={itemInputRef} type="text" id="item_input"/>
        <button onClick={handleAddItems} id="button"> Add Item </button>
        <button onClick={handleClearItems} id="button"> Clear Items </button>
        <button id="start_button"> Start Rating </button>
      </div>
    </>
  );
}

export default App;