import React, { useState, useEffect } from "react";

import * as FirestoreService from "./services/firestore";

function App() {
  const [list, setList] = useState([]);

  const addList = () => {
    console.log("In add list handler");
    FirestoreService.createNewItem(new Date().toISOString())
      .then(() => {
        console.log("Item added");
      })
      .catch((error) => {
        console.log("an error ocurred adding new item", error);
      });
  };

  useEffect(() => {
    console.log("In Use effect");
    let unsubs;
    unsubs = FirestoreService.streamGroceryListAll((listData) => {
      console.log("en useEffect - listdata", listData);
      setList(listData);
    });
    return unsubs;
  }, []);

  const renderData = () => {
    return list.map((el, idx) => (
      <li key={idx} data-testid="item">
        {el.name}
      </li>
    ));
  };

  return (
    <div>
      <button onClick={addList}>Add item to list</button>
      <ul>{renderData()}</ul>
    </div>
  );
}

export default App;
