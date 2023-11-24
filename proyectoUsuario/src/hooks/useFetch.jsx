import { useEffect } from "react"
import { useState } from "react"


export const useFetch = (url) => {
const[state,setState]=useState({
    //**Darle los valores iniciales */
    data:null,
    isLoading:null,
    hasError:null,
})
const getFetch=async()=>{
    //**Lo primero es setear el estado para poner su porpiedad cargando a true
    setState({ ...state, isLoading: true });
    try {
       const res=await fetch(url) 
       if(!res.ok){
        throw new Error(`Hay un Error${res.status}${res}`)
       }else{
        const dataJson= await res.json()
        //**setear el estado con los datos recibidos si todo ha salido bien y el loading a false */
        setState({...state,data:dataJson,isLoading:false})
       }
    } catch (error) {
        setState({...state,isLoading:false,hasError:error})
    }
}
//**Usar useEffect para que se lance el fetch cada vez que cambie la url */
useEffect(() => {
    getFetch();
  }, [url])
  return {
  
    data:state.data,
    isLoading:state.isLoading,
    hasError:state.hasError,
    state
  }
}

