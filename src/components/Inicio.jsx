import { useState } from 'react';
import Resultados from './Resultados';
import { Navigate } from 'react-router-dom';

function Inicio() {
  const [characters, setCharacters] = useState(null);
  const [name, setName] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [showSearchControls, setShowSearchControls] = useState(true); // Nuevo estado

  const fetchData = async () => {
    try {
      const apiUrl = name
        ? `https://127.0.0.1:7267/api/Productos/GetByTitle/${name}`
        : 'https://127.0.0.1:7267/api/Productos/GetAll';

      const response = await fetch(apiUrl);
      const data = await response.json();
      setCharacters(data);
      console.log(data);

      setShowAll(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBuscarClick = () => {
    if (name.trim() !== '') {
      setInputError(false);
      
      fetchData();
      
    } else {
      alert('Por favor, complete los datos');
      setInputError(true);
    }
  };

  const inputStyle = inputError ? { borderColor: 'red' } : {};

  return (
    <div className={`App container ${showAll ? 'show-all' : ''}`}>
      <header className="App-header">
        <img width={'100px'} height={'100px'} src='https://alicorp-prod-medias.s3.amazonaws.com/static-img/files/2021-06/articulo-5-consejos-para-hacer-compras-seguras-por-Internet/imagen-de-paginas-de-compra-segura-por-internet.png'/>
        <h1 className="title">Super + </h1>
        <div className="search-container">
          <div className="search-form">
            {showSearchControls && (  
              <input
                type="text"
                placeholder="Búsqueda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3"
                style={inputStyle}
              />
            )}
            <button onClick={handleBuscarClick} className="btn btn-primary">
              Buscar
            </button>
          </div>
          {characters && (
            <p className="text-muted">
              Resultados: {characters.length} {characters.length === 1 ? 'producto' : 'productos'}
            </p>
          )}
        </div>

        {characters && characters.length > 0 && showAll && (
          <Resultados
            characters={characters}
            showSearchControls={showSearchControls}  
            onInicioClick={() => setShowAll(false)}
            onItemClick={(id) => {
              setShowSearchControls(false);  // Oculta el campo de búsqueda cuando se selecciona un elemento
              Navigate(`/detalle/${id}`);
            }}
          />
        )}
      </header>
    </div>
  );
}

export default Inicio;
