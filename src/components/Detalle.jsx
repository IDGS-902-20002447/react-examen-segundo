/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './styles.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Inicio from './Inicio';

const Detalle = ({ characterDetails, onBackClick }) => {
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();

  const calculateTotalPrice = (character) => {
    const totalPrice = character.price - (character.price * (character.discountPercentage / 100));
    return totalPrice.toFixed(2);
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

  return (
    <div className="container">
      <br></br>
      <h6>Detalles del Producto</h6>
      {characterDetails && showDetails && (
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <img src={characterDetails.images[0]} width={'100%'} height={'auto'} alt={characterDetails.title} />
          </div>
          <div className="col-sm-12 col-md-6">
            <h3>{characterDetails.title}</h3>
            <p>
              <span className="text-grey">Precio: $</span>
              <span>{characterDetails.price}</span>
              {characterDetails.discountPercentage > 0 && (
                <span className="badge bg-info ms-2">-{characterDetails.discountPercentage}%</span>
              )}
              {' = '}
              <span className="text-danger">{calculateTotalPrice(characterDetails)}</span>
            </p>
            <p>
              <span className="text-grey"></span>
              <span>{characterDetails.description}</span>
            </p>
            <p>
              <span className="text-grey">Rating: </span>
              {renderStars(characterDetails.rating)}
              <span>{characterDetails.rating}</span>
            </p>
            <p>
              <span className="text-grey">Marca: </span>
              <span>{characterDetails.brand}</span>
            </p>
            <h6>
              {characterDetails.stock > 0 ? (
                <span className="badge bg-success">Disponible</span>
              ) : (
                <span className="badge bg-danger">No disponible</span>
              )}
            </h6>
          </div>
        </div>
      )}
      <div className="col-12">
        <button onClick={onBackClick} className="btn btn-danger">
          Volver a Inicio
        </button>
      </div>
    </div>
  );
};

export default Detalle;
