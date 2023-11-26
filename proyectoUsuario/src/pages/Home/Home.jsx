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
              Discover the best deals <br/>  in your neighborhood with VecinoMarket."
              </strong>
            </h3>
            <p>
           
VecinoMarket is your local ally, providing easy access to exceptional deals and fresh products directly in your neighborhood.
            </p>
          </div>

          <img
            src="https://res.cloudinary.com/djfkchzyq/image/upload/v1700842859/hai42lw6uu324sdz1wja.jpg"
            alt="Vecindario"
          />
        </article>

        <article className="frescos">
          <h2 className="hachedos"> Fresh and high-quality products</h2>
          <img src="productos.jpg" alt="Productos frescos" />
           <p>In an endeavor to transform the local shopping experience, VecinoMarket stands out as the preferred ally, providing the community with easy access to exceptional deals and fresh products right in their neighborhood. With an unwavering commitment to quality, VecinoMarket has become the top choice for those seeking a convenient and reliable way to stock up on fresh and high-quality products in their day-to-day lives. Explore the local shopping revolution with VecinoMarket today!</p>

        </article>
      </section>
    </>
  );
};
