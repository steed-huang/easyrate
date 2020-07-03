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
    // could replace uuid with name since they have unique names...
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

  // reset ratings to 50
  var handleClearRatings = (e) => {
    const newItems = items.map((item) => {
      return { ...item, rating: 50 };
    });
    setItems(newItems);
  };

  // for setState item from CompareItems component
  // updates rating of two items
  var updateItem = (i1, i2, new_r1, new_r2) => {
    const index_1 = items.indexOf(i1);
    const index_2 = items.indexOf(i2);
    const newItems = [...items];

    let n1 = new_r1;
    let n2 = new_r2;

    // set bounds
    if (n1 > 100) n1 = 100;
    else if (n1 < 0) n1 = 0;
    if (n2 > 100) n2 = 100;
    else if (n2 < 0) n2 = 0;

    // console log
    console.log(newItems[index_1].name + ": Before: " + newItems[index_1].rating + " After: " + n1);
    console.log(newItems[index_2].name + ": Before: " + newItems[index_2].rating + " After: " + n2);

    // update rating
    newItems[index_1] = { ...newItems[index_1], rating: n1 };
    newItems[index_2] = { ...newItems[index_2], rating: n2 };

    // sort by rating
    newItems.sort((a, b) => b.rating - a.rating);

    setItems(newItems);
  };

  // handle keydown enter for input
  var handleKeyDown = (e) => {
    // enter keycode
    if (e.keyCode === 13) {
      handleAddItems();
    }
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
        <input ref={itemInputRef} onKeyDown={handleKeyDown} type="text" id="item_input" />
        <button onClick={handleAddItems} className="button">
          Add Item
        </button>
        <button onClick={handleClearRatings} className="button">
          Clear Ratings
        </button>
        <button onClick={handleClearItems} className="button" id="button_bot">
          Clear Items
        </button>
      </div>

      {/* Item Comparing Modal */}
      <CompareItems items={items} updateItem={updateItem} />
    </>
  );
}

export default App;
