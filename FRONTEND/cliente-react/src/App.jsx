import { useEffect, useState } from 'react'

function App() {
  const [productos, setProductos] = useState([])
  const [estado, setEstado] = useState("")

  useEffect(() => {
    fetch("http://localhost:8080/api/productos", {
      headers: {
        "Authorization": "Basic " + btoa("admin:admin123")
      }
    })
      .then(res => res.json())
      .then(data => setProductos(data))
  }, [])

  // Healthcheck como ADMIN (debe funcionar)
  const healthAdmin = async () => {
    try {
      setEstado("Cargando...")

      const res = await fetch("http://localhost:8080/healthcheck", {
        headers: {
          "Authorization": "Basic " + btoa("admin:admin123")
        }
      })

      if (!res.ok) {
        setEstado("ERROR " + res.status)
        return
      }

      const data = await res.text()
      setEstado(data)

    } catch (error) {
      setEstado("Error de conexión con el servidor")
    }
  }

  // Healthcheck como CLIENTE (debe dar 403)
  const healthCliente = async () => {
    try {
      setEstado("Cargando...")

      const res = await fetch("http://localhost:8080/healthcheck", {
        headers: {
          "Authorization": "Basic " + btoa("cliente:cliente123")
        }
      })

      if (!res.ok) {
        setEstado("ERROR " + res.status)
        return
      }

      const data = await res.text()
      setEstado(data)

    } catch (error) {
      setEstado("Error de conexión con el servidor")
    }
  }

  return (
    <div>
      <h1>Lista de productos</h1>

      {productos.length === 0 ? (
        <p>No hay productos en la base de datos</p>
      ) : (
        <ul>
          {productos.map(p => (
            <li key={p.id}>
              {p.nombre} - {p.precio}€
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Comprobar estado del servidor</h2>

      <button onClick={healthAdmin}>
        Healthcheck como ADMIN
      </button>

      <button onClick={healthCliente} style={{ marginLeft: "10px" }}>
        Healthcheck como CLIENTE
      </button>

      <p>{estado}</p>
    </div>
  )
}

export default App
