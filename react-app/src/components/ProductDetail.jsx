import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState();
  const [showContact, setShowContact] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const p = useParams();

  const mockReviews = [
    {
      username: "John Doe",
      comment: "Great product! Totally worth the price.",
    },
    {
      username: "Jane Smith",
      comment: "Quality is excellent, delivery was fast.",
    },
    {
      username: "Alice Johnson",
      comment: "Loved it! Highly recommend this product.",
    },
  ];

  const mockStory =
    "This product was created with a vision to provide high-quality, durable solutions for everyday needs.";

  const mockFAQs = [
    {
      question: "What is the warranty on this product?",
      answer: "This product comes with a 1-year warranty.",
    },
    {
      question: "How do I use this product?",
      answer:
        "Simply follow the instructions in the user manual that comes with the product.",
    },
    {
      question: "Is there a return policy?",
      answer: "Yes, returns are accepted within 30 days of purchase.",
    },
  ];

  useEffect(() => {
    const url = `${API_URL}/get-product/${p.productId}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product);
        }
      })
      .catch(() => {
        alert("Server Error");
      });

    axios
      .get(`${API_URL}/get-faqs/${p.productId}`)
      .then((res) => setFaqs(res.data.faqs))
      .catch(() => setFaqs(mockFAQs));

    axios
      .get(`${API_URL}/get-reviews/${p.productId}`)
      .then((res) => setReviews(res.data.reviews))
      .catch(() => setReviews(mockReviews));
  }, [p.productId]);

  const handleContact = (addedBy) => {
    const url = `${API_URL}/get-user/${addedBy}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        alert("Server Error");
      });
  };

  const toggleContactDetails = () => {
    setShowContact(!showContact);
  };

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      axios
        .post(`${API_URL}/add-review`, {
          productId: p.productId,
          review: newReview,
        })
        .then((res) => {
          setReviews([...reviews, res.data.review]);
          setNewReview("");
        })
        .catch(() => {
          alert("Failed to submit review. Try again later.");
        });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <div
          style={{
            flex: "0 0 300px",
            padding: "20px",
            marginRight: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        >
          <h4 style={{ color: "#6C0345" }}>Frequently Asked Questions</h4>
          <div>
            {mockFAQs.map((faq, index) => (
              <details key={index} style={{ marginBottom: "10px" }}>
                <summary style={{ color: "#6C0345" }}>{faq.question}</summary>
                <p style={{ color: "#555" }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div
          className="product-detail-container"
          style={{
            display: "flex",
            maxWidth: "800px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: "1", maxWidth: "400px" }}>
            <Carousel
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              dynamicHeight={true}
              useKeyboardArrows={true}
            >
              <div>
                <img
                  src={`${API_URL}/${product.pimage}`}
                  alt="Product Image 1"
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              </div>
              {product.pimage2 && (
                <div>
                  <img
                    src={`${API_URL}/${product.pimage2}`}
                    alt="Product Image 2"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                </div>
              )}
            </Carousel>
          </div>
          <div style={{ flex: "1", padding: "20px" }}>
            <h3 className="text-success" style={{ color: "#28a745" }}>
              Rs. {product.price} /-
            </h3>
            <p className="text-muted" style={{ color: "#6c757d" }}>
              Category: {product.category}
            </p>
            <h2 style={{ color: "#6C0345" }}>{product.pname}</h2>
            <p style={{ color: "#6C0345", fontSize: "1.2rem" }}>
              {product.pdesc}
            </p>
            {product.addedBy && (
              <button
                style={{
                  backgroundColor: "#6C0345",
                  color: "#fff",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  marginTop: "15px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleContact(product.addedBy);
                  toggleContactDetails();
                }}
              >
                {showContact ? "Hide Contact Details" : "Show Contact Details"}
              </button>
            )}
            <button
              style={{
                backgroundColor: "#6C0345",
                color: "#fff",
                borderRadius: "5px",
                padding: "10px 20px",
                marginTop: "15px",
                marginLeft: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add to cart
            </button>
            {showContact && user && (
              <div style={{ marginTop: "15px", color: "#6C0345" }}>
                <h4>Username: {user.username}</h4>
                <p>Mobile number: {user.mobile}</p>
                <p>Email: {user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Storytelling Section */}
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h4 style={{ color: "#6C0345" }}>Seller's Story</h4>
        <p style={{ color: "#555" }}>{product?.story || mockStory}</p>
      </div>

      {/* Review Section */}
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h4 style={{ color: "#6C0345" }}>Customer Reviews</h4>
        <div>
          {reviews.map((review, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p style={{ color: "#6C0345" }}>
                <strong>{review.username}</strong>
              </p>
              <p style={{ color: "#555" }}>{review.comment}</p>
            </div>
          ))}
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here"
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleReviewSubmit}
            style={{
              backgroundColor: "#6C0345",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Submit Review
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
