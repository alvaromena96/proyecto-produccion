import { useEffect, useState } from "react";
import { getItems, createItem, deleteItem } from "../services/api";

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newItem.trim() === "") return;

    await createItem({ name: newItem });
    setNewItem("");
    loadItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <div>
      <h2>Listado desde la API</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nuevo elemento"
        />
        <button type="submit">Añadir</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
