import React, { useState } from 'react';

const provinciasIbericas = {
  espana: [
    "alava", "albacete", "alicante", "almeria", "asturias", "avila",
    "badajoz", "barcelona", "burgos", "caceres", "cadiz", "cantabria",
    "castellon", "ciudad real", "cordoba", "cuenca", "gerona", "granada",
    "guadalajara", "guipuzcoa", "huelva", "huesca", "islas baleares",
    "jaen", "la coruna", "la rioja", "las palmas", "leon", "lerida",
    "lugo", "madrid", "malaga", "murcia", "navarra", "orense",
    "palencia", "pontevedra", "salamanca", "santa cruz de tenerife",
    "segovia", "sevilla", "soria", "tarragona", "teruel", "toledo",
    "valencia", "valladolid", "vizcaya", "zamora", "zaragoza"
  ]
};

export const FormProvincias = ({ registerForm }) => {
  const [paisSeleccionado, setPaisSeleccionado] = useState('espana');
  const [provincias, setProvincias] = useState(provinciasIbericas['espana']);


  return (
    <div>
      <label htmlFor="provincia"></label>
      <select id="provincia" name="provincia" {...registerForm}>
        {provincias.map((provincia) => (
          <option key={provincia} value={provincia}>
            {provincia}
          </option>
        ))}
      </select>
    </div>
  );
};
