import classes from "./Catagory.module.css";
// import classes from './Catagory.module.css'
import { Link } from "react-router-dom";

function CatagoryCard({ data }) {
  return (
    <div className={classes.catagory}>

      <Link to={`/Catagory/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
