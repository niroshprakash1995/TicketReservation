import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import styles from "../PageNavbar/PageNavbar.module.css";
import { useNavigate } from "react-router-dom";

function PageNavbar({ navLocation }) {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(`/${route}`);
  };

  return (
    <div className="pb-5">
      <Navbar bg="transparent" variant="dark" className="mr-0">
        <div className="w-100 pe-3 d-flex flex-row justify-content-end">
          <Button
            className={`${styles.navbar} ${
              navLocation === "search"
                ? `${styles["selected"]} ${styles["mr-5"]}`
                : styles["mr-5"]
            }`}
            style={{ marginRight: "15px" }}
            onClick={() => handleButtonClick("search")}
          >
            Search
          </Button>
          <Button
            className={`${styles.navbar} ${
              navLocation === "favorites" ? `${styles["selected"]}` : ""
            }`}
            onClick={() => handleButtonClick("favorites")}
          >
            Favorites
          </Button>
        </div>
      </Navbar>
    </div>
  );
}

export default PageNavbar;
