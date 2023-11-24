import { useFetch } from "../hooks/useFetch";

export const traerPersonajes=()=>{
    const personajes = [];
    for (let i = 1; i < 10; i++) {
      const { data } = useFetch(`https://api.attackontitanapi.com/characters/${i}`);
    
        data && personajes.push(data);
    }   
    return personajes
}
export const traerLugares=()=>{
    const lugares = [];
    for (let i = 1; i < 40; i++) {
      const { data } = useFetch(`https://api.attackontitanapi.com/locations/${i}`);
    
        data && lugares.push(data);
    }   
    return lugares
}
export const traerTitanes=()=>{
    const titanes = [];
    for (let i = 1; i < 10; i++) {
      const { data } = useFetch(`https://api.attackontitanapi.com/titans/${i}`);
    
        data && titanes.push(data);
    }   
    return titanes
}





    
   
 

