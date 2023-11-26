import React from "react";
import "./Home.css";
import { buscarMiUser } from "../../services/user.service";

export const Home = () => {
  


  return (
    <>
      <section>
        <div className="registration"></div>
        <h2 className="hachedos">Explora tu Vecindario</h2>
        <article className="post">
          <div className="textouno">
            <h3 className="title-post">
              <strong>
                Descubre las mejores ofertas <br/> en tu vecindario con con
                VecinoMarket.
              </strong>
            </h3>
            <p>
              VecinoMarket es tu aliado local, brindando acceso fácil a ofertas
              excepcionales y productos frescos directamente en tu vecindario.
             
            </p>
          </div>

          <img
            src="https://res.cloudinary.com/djfkchzyq/image/upload/v1700842859/hai42lw6uu324sdz1wja.jpg"
            alt="Vecindario"
          />
        </article>

        <article className="frescos">
          <h2 className="hachedos">Productos Frescos</h2>
          <img src="productos.jpg" alt="Productos frescos" />
          <p>Encuentra productos frescos y de calidad en nuestro mercado.</p>
        </article>
      </section>
    </>
  );
};
