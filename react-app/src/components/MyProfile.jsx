import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";
import "./MyProfile.css";
import Footer from "./Footer";
function MyProfile() {
  const [user, setuser] = useState({});

  useEffect(() => {
    let url = API_URL + "/my-profile/" + localStorage.getItem("userId");
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        if (res.data.user) {
          setuser(res.data.user);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  }, []);

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <span className="avatar-initial">S</span>
          </div>
          <div className="profile-info">
            <h2>Sujal Agrawal</h2>
            <p>
              <span className="calendar-icon">📅</span> Member since 2 days ago
            </p>
            <p>
              <span className="followers-icon">👥</span> 128 Followers | 8
              Following
            </p>
            <p>User verified with</p>
            <div className="verification-icons">
              <span className="icon ri-google-fill">
                {/* Add verification icons here */}
              </span>
            </div>
          </div>
          <button className="edit-profile-button">
            <span className="edit-icon"></span> Edit Profile
          </button>
          <button className="share-profile-button">Share Profile</button>
        </div>
        <div className="profile-content">
          <div className="empty-listings">
            <button className="start-selling-button">Start selling</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyProfile;
