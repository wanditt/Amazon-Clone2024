import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel"; //
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";
import "./Carousel.module.css";

function Carousel() {
  return (
    <div>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => {
          return <img src={imageItemLink} key={`carousel-image-${index}`} />;
        })}
      </ResponsiveCarousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default Carousel;

//    {
//      img.map((imageItemLink, index) => (
//        <img
//          key={`carousel-image-${index}`}
//          src={imageItemLink}
//          alt={`Slide ${index}`}
//        /> // Use unique keys
//      ));
// }
//     {
//       img.map((imageItemLink, index) => (
//         <img
//           key={`carousel-image-${index}`}
//           src={imageItemLink}
//           alt={`Slide ${index}`}
//         /> // Use unique keys
//       ));
//     }
