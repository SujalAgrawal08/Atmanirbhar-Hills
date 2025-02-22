import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      pname: "Himachali Woolen Cap/Topi",
      price: 399,
      quantity: 1,
      image: "/images/11.jpg",
    },
    {
      id: 2,
      pname: "Diya (Pack of 10)",
      price: 199,
      quantity: 2,
      image: "/images/12.jpg",
    },
    {
      id: 3,
      pname: "Riddhi Siddhi Kalash",
      price: 699,
      quantity: 1,
      image: "/images/13.jpg",
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#6C0345",
          }}
        >
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <p
            style={{ textAlign: "center", fontSize: "18px", color: "#6C0345" }}
          >
            Your cart is empty!
          </p>
        ) : (
          cart.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "15px",
                marginBottom: "20px",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.image}
                  alt={product.pname}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "15px",
                  }}
                />
                <div>
                  <h3 style={{ fontSize: "18px", color: "#333" }}>
                    {product.pname}
                  </h3>
                  <p style={{ color: "#777", margin: "5px 0" }}>
                    Price: Rs. {product.price}
                  </p>
                  <p style={{ color: "#777", margin: "5px 0" }}>
                    Quantity: {product.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(product.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  borderRadius: "5px",
                  padding: "8px 15px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#c82333")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#dc3545")
                }
              >
                Remove
              </button>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <>
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                marginTop: "20px",
              }}
            >
              <p style={{ color: "#6C0345" }}>
                <strong>Total Price: Rs. 1297</strong>
              </p>
              <button
                onClick={toggleModal}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Proceed to Payment
              </button>
            </div>
            {showModal && (
              <div
                style={{
                  position: "fixed",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "300px",
                    textAlign: "center",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 style={{ color: "#6C0345" }}>Select Payment Method</h3>
                  <button
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      border: "none",
                      marginBottom: "10px",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                  >
                    Cash on Delivery (COD)
                  </button>
                  <br />
                  <button
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      border: "none",
                      marginBottom: "10px",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                  >
                    Pay via UPI
                  </button>
                  <br />
                  <button
                    onClick={toggleModal}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      border: "none",
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            to="/"
            style={{
              color: "#6C0345",
              textDecoration: "underline",
              fontSize: "16px",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
