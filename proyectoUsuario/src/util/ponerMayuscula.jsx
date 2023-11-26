export const mayusPrimeraLetra = (cadena) => {
    if (cadena.length === 0) {
      return cadena;
    }
  
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  };