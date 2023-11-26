import React from 'react'
import"./CardSuper.css"
export const CardSuper = ( {name, numeroLocales, provincias, image}) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
  return (
    <div className="card-super">
    <div className="image-container">
      <img src={image} alt={name} className="image" />
    </div>
    <div className="text-container">
      <h2>{name}</h2>
      <p className="info">Número de locales: {numeroLocales}</p>
      <p className="info">Provincias: {provincias.map(capitalizeFirstLetter).join(', ')}</p>
    </div>
  </div>
  )
}
