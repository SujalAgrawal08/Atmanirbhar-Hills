import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./Home.css";
import API_URL from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "./Slider";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [issearch, setissearch] = useState(false);

  useEffect(() => {
    const url = API_URL + "/get-products";
    axios
      .get(url)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        toast.error("Server Err.");
      });
  }, []);

  const handlesearch = (value) => {
    setsearch(value);
  };

  const handleClick = () => {
    const url =
      API_URL +
      "/search?search=" +
      search +
      "&loc=" +
      localStorage.getItem("userLoc");
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.products);
        setcproducts(res.data.products);
        setissearch(true);
      })
      .catch((err) => {
        toast.error("Server Err", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem("userId");

    if (!userId) {
      toast.info("Please Login first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const url = API_URL + "/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          toast.success("Liked", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error("Server Err", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div>
      <Header
        search={search}
        handlesearch={handlesearch}
        handleClick={handleClick}
      />

      <Categories handleCategory={handleCategory} />

      <Slider />
      {issearch && cproducts && (
        <h5 style={{ color: "#6C0345" }}>
          {" "}
          SEARCH RESULTS
          <button className="clear-btn" onClick={() => setissearch(false)}>
            {" "}
            CLEAR{" "}
          </button>
        </h5>
      )}

      {issearch && cproducts && cproducts.length == 0 && (
        <h5> No Results Found </h5>
      )}
      {issearch && (
        <div className="d-flex justify-content-center flex-wrap">
          {cproducts &&
            products.length > 0 &&
            cproducts.map((item, index) => {
              return (
                <div key={item._id} className="card m-3">
                  <div
                    onClick={() => handleLike(item._id)}
                    className="icon-con"
                  >
                    <FaHeart className="icons" />
                  </div>
                  <img
                    width="300px"
                    height="200px"
                    src={API_URL + "/" + item.pimage}
                    alt={item.pname}
                  />

                  <p className="m-2"> {item.pname} </p>
                  <p className="m-2">{item.category} </p>
                  <h3 className="m-2 text-danger"> {item.price} </h3>
                  <p className="m-2 text-success"> {item.pdesc} </p>
                </div>
              );
            })}
        </div>
      )}

      {!issearch && (
        <div className="d-flex">
          <div className="d-flex justify-content-center flex-wrap">
            {products &&
              products.length > 0 &&
              products.map((item, index) => {
                return (
                  <div
                    onClick={() => handleProduct(item._id)}
                    key={item._id}
                    className="card m-3"
                  >
                    <div
                      onClick={(e) => handleLike(item._id, e)}
                      className="icon-con"
                    >
                      <FaHeart className="icons" />
                    </div>
                    <img
                      width="250px"
                      height="150px"
                      src={API_URL + "/" + item.pimage}
                    />
                    <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                    <p className="m-2"> {item.pname} </p>
                    <p className="m-2">{item.category} </p>
                    <p className="m-2 text-success"> {item.pdesc} </p>
                  </div>
                );
              })}
          </div>

          <ul style={{ width: "100rem" }} className="list-group">
            <a
              style={{ backgroundColor: "#FFF8DC" }}
              href="https://economictimes.indiatimes.com/news/india/atmanirbhar-bharat-campaign-becoming-a-mass-movement-pm-modi-in-mann-ki-baat/articleshow/114650147.cms"
              className="list-group-item"
              aria-current="true"
            >
              Atmanirbhar Bharat campaign becoming a mass movement: PM Modi in
              'Mann Ki Baat'
            </a>
            <a
              href="https://economictimes.indiatimes.com/news/india/ayodhya-ram-temple-not-to-use-chinese-diwali-decorative-items-trust/articleshow/114737014.cms"
              className="list-group-item"
            >
              Ayodhya Ram Temple not to use Chinese Diwali decorative items:
              Trust
            </a>
            <a
              style={{ backgroundColor: "#FFF8DC" }}
              href="https://economictimes.indiatimes.com/news/defence/to-save-flying-hours-iaf-inaugurates-c-295-simulator-to-train-pilots/articleshow/115226762.cms"
              className="list-group-item"
            >
              To save flying hours, IAF inaugurates C-295 simulator to train
              pilots
            </a>
            <a
              href="https://economictimes.indiatimes.com/news/defence/govt-starts-process-of-procuring-surveillance-helicopters-with-accessories/articleshow/115219168.cms"
              className="list-group-item"
            >
              Govt starts process of procuring surveillance helicopters with
              accessories
            </a>
            <a
              style={{ backgroundColor: "#FFF8DC" }}
              href="https://economictimes.indiatimes.com/news/india/use-vedic-wisdom-to-do-better-with-lesser-resourcesnavi-radjou/articleshow/115310383.cms"
              className="list-group-item"
            >
              Use Vedic wisdom to do better with lesser resources: Navi Radjou
            </a>
            <a
              href="https://economictimes.indiatimes.com/news/economy/foreign-trade/consider-two-annual-editions-of-international-trade-fair-piyush-goyal-tells-itpo/articleshow/115303381.cms"
              className="list-group-item"
            >
              Consider two annual editions of international trade fair: Piyush
              Goyal tells ITPO
            </a>
            <a
              style={{ backgroundColor: "#FFF8DC" }}
              href="https://economictimes.indiatimes.com/industry/healthcare/biotech/pharmaceuticals/lyfius-pharma-penicillin-g-plant-inaugurated-by-pm-modi/articleshow/114737382.cms"
              className="list-group-item"
            >
              Lyfius Pharma Penicillin-G plant inaugurated by PM Modi
            </a>
            <a
              href="https://economictimes.indiatimes.com/news/india/pm-cites-popularity-of-chhota-bheem-urges-people-to-make-india-global-animation-powerhouse/articleshow/114651003.cms"
              className="list-group-item"
            >
              PM cites popularity of 'Chhota Bheem', urges people to make India
              global animation powerhouse
            </a>
            <a
              style={{ backgroundColor: "#FFF8DC" }}
              href="https://economictimes.indiatimes.com/industry/cons-products/durables/indias-consumer-durables-sector-set-to-grow-11-cagr-by-2029-creating-5-lakh-jobs/articleshow/114011033.cms"
              className="list-group-item"
            >
              India's consumer durables sector set to grow 11% CAGR by 2029,
              creating 5 lakh jobs
            </a>
          </ul>
        </div>
      )}
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Home;
