
const API_URL = 'https://thesimpsonsapi.com/api/characters'

const IMAGES_URL = 'https://cdn.thesimpsonsapi.com/500'

export const fetchPersonajes = async () => {
  const respuesta = await fetch(API_URL)

  if (!respuesta.ok) {
    throw new Error('Error al obtener los personajes')
  }

  const datos = await respuesta.json()

  return datos.results.map((personaje) => ({
    id: personaje.id,
    name: personaje.name,
    image: `${IMAGES_URL}${personaje.portrait_path}`,
    status: personaje.age ? `Edad: ${personaje.age}` : 'Personaje',
    species: personaje.occupation || 'Sin ocupación'
  }))
}
