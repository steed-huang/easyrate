import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ItemList from "../ItemList";
import CompareItems from "../CompareItems";

const { v4: uuidv4 } = require("uuid");

const LOCAL_STORAGE_KEY = "easyRate.items";

function App() {
  const [items, setItems] = useState([]);
  const itemInputRef = useRef();

  // retrieve items from local storage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedItems) setItems(storedItems);
  }, []);

  // store items to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // add new item to list
  var handleAddItems = (e) => {
    const name = itemInputRef.current.value;
    if (name === "") return;
    setItems((prevItems) => {
      return [...prevItems, { id: uuidv4(), name: name, rating: 50 }];
    });
    itemInputRef.current.value = null;
  };

  // add new item to list
  var handleClearItems = (e) => {
    const newItems = [];
    setItems(newItems);
  };

  return (
    <>
      {/* List Body */}
      <div id="list_body" className="centered-flex">
        <div id="list">
          <ItemList itemList={items} />
        </div>
      </div>

      <div id="add_body" className="centered-flex">
        {/* Item Interaction */}
        <input ref={itemInputRef} type="text" id="item_input" />
        <button onClick={handleAddItems} id="button_1">
          Add Item
        </button>
        <button onClick={handleClearItems} id="button_2">
          Clear Items
        </button>

        {/* Item Comparing Modal */}
        <CompareItems item_one={1} item_two={2} />
      </div>
    </>
  );
}

export default App;
