// import React from "react";
// import { CatagoryInfos } from "./CatagoryFullinfos";
// import CatagoryCard from "./CatagoryCard";

// function Catagory() {
//   return (
//     <section>
//       {CatagoryInfos.map((infos) => {
//         <CatagoryCard data={infos} />;
//       })}
//     </section>
//   );
// }

// export default Catagory;

// import React from "react";
// import { CatagoryInfos } from "./CatagoryFullinfos";
// import CatagoryCard from "./CatagoryCard";
// import classes from "./Catagory.module.css";

// function Catagory() {
//   return (

//     <section className={classes.catagory_container}>

//       {
//         CatagoryInfos.map((infos, index) => (

//         <CatagoryCard key={index} data={infos} /> // Adding a unique key prop
//         )
//         )
//       }
//     </section>
//   );
// }

// export default Catagory;
import React from "react";
import { CatagoryInfos } from "./CatagoryFullinfos";
import CatagoryCard from "./CatagoryCard";
import classes from "./Catagory.module.css";

function Catagory() {
  return (
    <section className={classes.catagory_container}>
      {CatagoryInfos.map((infos, index) => (
        <CatagoryCard key={index} data={infos} /> // Properly returning the component
      ))}
    </section>
  );
}

export default Catagory;
