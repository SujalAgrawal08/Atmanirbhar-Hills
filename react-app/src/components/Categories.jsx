import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import categories from "./CategoriesList";

function Categories(props) {
  const navigate = useNavigate();

  return (
    <div className="cat-container">
      <div>
        {categories &&
          categories.length > 0 &&
          categories.map((item, index) => {
            return (
              <span
                style={{ color: "#6C0345" }}
                onClick={() => navigate("/category/" + item)}
                key={index}
                className="category"
              >
                {" "}
                {item}{" "}
              </span>
            );
          })}
      </div>
    </div>
  );
}

export default Categories;
