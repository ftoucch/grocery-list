import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ groceryItems, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {groceryItems.map((groceryItem) => {
        const { id, grocery } = groceryItem;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{grocery}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
