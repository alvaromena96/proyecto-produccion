import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/productos", {
      headers: {
        Authorization: "Basic " + btoa("admin:admin123"),
      },
    })
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const healthAdmin = async () => {
    try {
      setEstado("Cargando...");

      const res = await fetch("http://localhost:8080/healthcheck", {
        headers: {
          Authorization: "Basic " + btoa("admin:admin123"),
        },
      });

      if (!res.ok) {
        setEstado("ERROR " + res.status);
        return;
      }

      const data = await res.text();
      setEstado(data);
    } catch (error) {
      setEstado("Error de conexión con el servidor");
    }
  };

  const healthCliente = async () => {
    try {
      setEstado("Cargando...");

      const res = await fetch("http://localhost:8080/healthcheck", {
        headers: {
          Authorization: "Basic " + btoa("cliente:cliente123"),
        },
      });

      if (!res.ok) {
        setEstado("ERROR " + res.status);
        return;
      }

      const data = await res.text();
      setEstado(data);
    } catch (error) {
      setEstado("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-5">

      <div className="row">

        {/* IZQUIERDA - PRODUCTOS */}
        <div className="col-md-6">
          <div className="card p-4 shadow rounded-4 h-100">
            <h1 className="mb-4 fs-3 text-primary">Lista de productos</h1>

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

        {/* DERECHA - SERVIDOR */}
        <div className="col-md-6">
          <div className="card p-4 shadow rounded-4 h-100 fade-in">
            <h2 className="mb-4 fs-5 text-secondary">
              Comprobar estado del servidor
            </h2>

            <div className="d-flex flex-column gap-3">
              <button onClick={healthAdmin} className="btn btn-primary">
                Healthcheck ADMIN
              </button>

              <button onClick={healthCliente} className="btn btn-warning">
                Healthcheck CLIENTE
              </button>
            </div>

            <p className="fw-bold mt-4">{estado}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;