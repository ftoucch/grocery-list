import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let groceryItems = localStorage.getItem("list");
  if (groceryItems) {
    return (groceryItems = JSON.parse(localStorage.getItem("groceryItems")));
  } else {
    return [];
  }
};

function App() {
  const [grocery, setGrocery] = useState("");
  const [groceryItems, setGroceryItems] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!grocery) {
      showAlert(true, "danger", "please Enter a value");
    } else if (grocery && isEditing) {
      setGroceryItems(
        groceryItems.map((groceryItem) => {
          if (groceryItem.id === editId) {
            return { ...groceryItem, grocery };
          }
          return groceryItem;
        })
      );
      setGrocery("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "danger", "value has changed");
    } else {
      const groceryItem = { id: new Date().getTime().toString(), grocery };
      setGroceryItems((groceryItems) => {
        return [...groceryItems, groceryItem];
      });
      setGrocery("");
      showAlert(true, "success", "Item added to cart");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert("true", "danger", "empty List");
    setGroceryItems([]);
  };

  const editItem = (id) => {
    const specificItem = groceryItems.find(
      (groceryItem) => groceryItem.id === id
    );

    setIsEditing(true);
    setEditID(id);
    setGrocery(specificItem.grocery);
  };

  const removeItem = (id) => {
    showAlert("true", "danger", "ItemRemoved");
    setGroceryItems(
      groceryItems.filter((groceryItem) => groceryItem.id !== id)
    );
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert
            {...alert}
            groceryItems={groceryItems}
            removeAlert={showAlert}
          />
        )}
        <h3>grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg rice"
            value={grocery}
            onChange={(e) => {
              setGrocery(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List
          groceryItems={groceryItems}
          removeItem={removeItem}
          editItem={editItem}
        />
        {groceryItems.length > 0 && (
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        )}
      </div>
    </section>
  );
}

export default App;
