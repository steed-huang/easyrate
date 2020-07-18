import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ItemList from "../ItemList";
import CompareItems from "../CompareItems";

const { v4: uuidv4 } = require("uuid");

const LOCAL_STORAGE_KEY = "easyRate.items";

function App() {
  const [items, setItems] = useState([]);
  const itemInputRef = useRef();
  const userInputRef = useRef();

  // retrieve items from local storage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedItems) setItems(storedItems);
  }, []);

  // store items to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // add all watched anime of user
  var addUserAnime = () => {
    const user = userInputRef.current.value.trim();
    try {
      fetch("https://api.jikan.moe/v3/user/" + user + "/animelist/completed")
        .then((res) => res.json())
        .then((json) => {
          console.log(json.anime);
          for (let i = 0; i < json.anime.length; i++) {
            //if (json.anime[i].score >= 6) {
            setItems((prevItems) => {
              return [
                ...prevItems,
                {
                  id: uuidv4(),
                  name: json.anime[i].title,
                  img: json.anime[i].image_url,
                  rating: 500,
                },
              ];
            });
            //}
          }
        });
    } catch (e) {
      console.log("error");
    }

    userInputRef.current.value = null;
  };

  // add new item to list
  var handleAddItems = (e) => {
    const name = itemInputRef.current.value;
    if (name === "") return;
    // could replace uuid with name since they have unique names...
    setItems((prevItems) => {
      return [...prevItems, { id: uuidv4(), name: name, rating: 500 }];
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
      return { ...item, rating: 500 };
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
    if (n1 > 1000) n1 = 1000;
    else if (n1 < 10) n1 = 10;
    if (n2 > 1000) n2 = 1000;
    else if (n2 < 10) n2 = 10;

    // log rating change
    console.log(newItems[index_1].name + ": " + newItems[index_1].rating + " -> " + n1);
    console.log(newItems[index_2].name + ": " + newItems[index_2].rating + " -> " + n2);

    // update rating
    newItems[index_1] = { ...newItems[index_1], rating: n1 };
    newItems[index_2] = { ...newItems[index_2], rating: n2 };

    // log avg rating
    const total_rating = newItems.reduce((totalRating, item) => {
      return totalRating + parseFloat(item.rating);
    }, 0);
    if (newItems.length > 0)
      console.log("Average Rating: " + (total_rating / newItems.length).toFixed(1));

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
        <div>
          <input ref={userInputRef}></input>
          <button onClick={addUserAnime} className="button" id="button">
            Load Watched
          </button>
        </div>

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
