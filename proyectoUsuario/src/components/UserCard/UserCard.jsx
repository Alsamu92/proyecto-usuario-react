import React, { useEffect, useState } from 'react';
import "./UserCard.css";
import { useParams } from 'react-router-dom';
import { useFavUser } from '../../hooks/useFavUser';
import { seguirUser } from '../../services/user.service';
import { useAuth } from '../../context/authContext';

export const UserCard = ({ name, gender, comentarios, followed, following, provincia, image, id }) => {


  const [clicked, setClicked] = useState(false);

  const handleSeguirClick = async (userId) => {
    
    await seguirUser(userId);
    
    setClicked(prevState => !prevState);
  };

  useEffect(() => {
    console.log("Componente actualizado");
  }, [clicked]);
  return (
    <>
      <article key={id} className="user-card">
        <div className="user-card-header">
          <img src={image} alt={name} className="user-avatar" />
        </div>

        <h2 className="user-name">{name}</h2>
        <p className="user-gender">{gender}</p>
        <div className="user-details">
          <ul>
            <li><strong>Comentarios:</strong> {comentarios}</li>
            <li><strong>Seguidores:</strong> {followed}</li>
            <li><strong>Siguiendo:</strong> {following}</li>
          </ul>
        </div>
        <div className="user-location">
          <p><strong>Provincia:</strong> {provincia}</p>
          {/* Utiliza una función anónima para llamar a handleSeguirClick */}
          <span onClick={() => handleSeguirClick(id)} className="material-symbols-outlined">
            favorite
          </span>
        </div>
      </article>
    </>
  );
};