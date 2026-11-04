
import { useState } from 'react'
import PersonajeList from './components/PersonajeList.jsx'
import FavoritesPanel from './components/FavoritesPanel.jsx'
import usePersonajes from './hooks/usePersonajes.js'

function MultiversoApp() {
  const { personajes, cargando, error } = usePersonajes()

  const [favoritos, setFavoritos] = useState([])

  const alternarFavorito = (personaje) => {
    setFavoritos((actuales) => {
      const existe = actuales.some(
        (favorito) => favorito.id === personaje.id
      )

      if (existe) {
        return actuales.filter(
          (favorito) => favorito.id !== personaje.id
        )
      }

      return [...actuales, personaje]
    })
  }

  const quitarFavorito = (id) => {
    setFavoritos((actuales) =>
      actuales.filter((personaje) => personaje.id !== id)
    )
  }

  return (
    <>
      <h1>Los Simpson Universo</h1>

      {cargando && (
        <p className="mensaje">Cargando...</p>
      )}

      {error && (
        <p className="mensaje error">
          Error al cargar los personajes.
          Verifica tu conexión a internet.
        </p>
      )}

      {!cargando && !error && (
        <div className="layout">

          <PersonajeList
            personajes={personajes}
            favoritos={favoritos}
            onToggleFavorito={alternarFavorito}
          />

          <FavoritesPanel
            favoritos={favoritos}
            onQuitar={quitarFavorito}
          />

        </div>
      )}
    </>
  )
}

export default MultiversoApp
