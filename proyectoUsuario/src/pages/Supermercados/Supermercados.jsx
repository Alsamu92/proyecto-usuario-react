import "./Supermercados.css";
import { useForm } from "react-hook-form";
import { CardSuper, FormProvincias } from "../../components";
import { useEffect, useState } from "react";
import { buscarProvinciaSup } from "../../services/supers.service";
import { useBuscarProvinciaError } from "../../hooks/useBuscarProvinciaError";
import { mayusPrimeraLetra } from "../../util/ponerMayuscula";

export const Supermercados = () => {
  const { register, handleSubmit } = useForm();
  const [resp, setResp] = useState({});
  const [sendd, setSendd] = useState(false);
  const [provincia, setProvincia] = useState(""); // Add state for selected provincia

  const formSubmit = async (provincia) => {
    setSendd(true);
    const comunidad = provincia.provincia;
    setResp(await buscarProvinciaSup(comunidad));
    setSendd(false);
    console.log(provincia);
  };

  useEffect(() => {
    // Lógica a ejecutar después de cada renderizado
    console.log(resp);
  }, [sendd]);
  useEffect(() => {
   useBuscarProvinciaError(resp,setResp)
  }, [resp]);

  return (
    <>
      <div className="super-page">
    
        <section className="section-super">
          <div className="parte-izquierda">
          <h2 className="titulo-izq">Savings start by finding a supermarket.</h2>
          <form className="form-select" onSubmit={handleSubmit(formSubmit)}>
            <FormProvincias
              registerForm={register("provincia", {
                required: "Seleccione una provincia",
              })}
              setProvincia={setProvincia}
            />
            <button
              type="submit"
              disabled={sendd}
              style={{ background: sendd ? "#49c1a388" : "#2f7a67" }}
            >
              Send
            </button>
          </form>
          </div>
          

          <div className="mapa-espana">
            <>
            <button className="circulo-distrito madrid" onClick={() => formSubmit({ provincia: "madrid" })}></button>

              <button className="circulo-distrito valencia" onClick={() => formSubmit({ provincia: "madrid" })}></button>
              <button className="circulo-distrito barcelona" onClick={() => formSubmit({ provincia: "barcelona" })}></button>
              <button className="circulo-distrito cadiz" onClick={() => formSubmit({ provincia: "cadiz" })}></button>
              <button className="circulo-distrito pontevedra" onClick={() => formSubmit({ provincia: "pontevedra" })}></button>
            </>
          </div>
          
        </section>
        {resp != null && (
          resp?.data?.map((supermercado) => (
            <CardSuper
              key={supermercado._id}
              name={mayusPrimeraLetra(supermercado.name)}
              image={supermercado.image}
              provincias={supermercado.provincias}
              numeroLocales={supermercado.numeroLocales}
            />
          ))
        )}
        
      </div>
    </>
  );
};
