import React, { useState, useEffect } from "react";
import Item from "./Item";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URI)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URI}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
