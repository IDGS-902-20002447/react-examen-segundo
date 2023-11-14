// Characters.js
import React from 'react';
import Detalle from './Detalle';

const Characters = ({ characters }) => {
  const [selectedCharacter, setSelectedCharacter] = React.useState(null);

  const handleCharacterClick = async (character) => {
    try {
      const response = await fetch(`https://127.0.0.1:7267/api/Productos/GetById/${character.id}`);
      const data = await response.json();

      const characterWithDetails = {
        ...character,
        details: data,
      };

      setSelectedCharacter(characterWithDetails);
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  const resetCharacters = () => {
    setSelectedCharacter(null);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }

    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }

    return stars;
  };

  const calculateTotalPrice = (character) => {
    const totalPrice = character.price - (character.price * (character.discountPercentage / 100));
    return totalPrice.toFixed(2);
  };

  return (
    <div className="container">
      {selectedCharacter ? (
        <Detalle characterDetails={selectedCharacter} onBackClick={resetCharacters} />
      ) : (
        <React.Fragment>
          <br />
          <h6>Productos Encontrados</h6>
          <br />
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {characters.map((character) => (
              <div
                key={character.id}
                className="col mb-4"
                onClick={() => handleCharacterClick(character)}
              >
                <div className="card h-100">
                  <img src={character.images[0]} width={'100'} height={'150px'} alt={character.title} className="card-img-top" />
                  <div className="card-body">
                    <h3 className="card-title">{character.title}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {character.stock > 0 ? (
                        <span className="badge bg-success">Disponible</span>
                      ) : (
                        <span className="badge bg-danger">No disponible</span>
                      )}
                    </h6>
                    <p className="card-text">
                      <span className="text-grey">Precio: $</span>
                      <span>{character.price}</span>
                      {character.discountPercentage > 0 && (
                        <span className="badge bg-info ms-2">-{character.discountPercentage}%</span>
                      )}
                      {' = '}
                      <span className="text-danger">{calculateTotalPrice(character)}</span>
                    </p>
                    <p className="card-text">
                      <span className="text-grey"></span>
                      <span>{character.description}</span>
                    </p>
                    <p className="card-text">
                      <span className="text-grey">Rating: </span>
                      {renderStars(character.rating)}
                    </p>
                    <p className="card-text">
                      <span className="text-grey">Marca: </span>
                      <span>{character.brand}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Characters;
