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
  <div className="container-fluid">
    
    <div className="row">

      {/* SIDEBAR */}
      <div className="col-md-3 bg-dark text-white p-4" style={{ minHeight: "100vh" }}>
        <h4 className="mb-4">Panel</h4>

        <button onClick={healthAdmin} className="btn btn-success w-100 mb-2">
          Healthcheck ADMIN
        </button>

        <button onClick={healthCliente} className="btn btn-warning w-100">
          Healthcheck CLIENTE
        </button>

        <hr />

        <p>{estado}</p>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="col-md-9 p-4">
        <h1 className="mb-4">Lista de productos</h1>

        {productos.length === 0 ? (
          <p>No hay productos en la base de datos</p>
        ) : (
          <ul className="list-group">
            {productos.map((p) => (
              <li key={p.id} className="list-group-item">
                {p.nombre} - {p.precio}€
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>

  </div>
);
}

export default ItemList;