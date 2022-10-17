import { Avatar } from "@mui/material";
import { color, fontSize } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Header from "./Header";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);
  const companies = [
    {
      name: "Orion Innovation",
      photo:
        "https://cdn-images-1.medium.com/max/1200/1*rcYKyOQnJXgZEeW38sPf3Q.jpeg",
    },
    {
      name: "LinkedIn",
      photo:
        "https://wordvice-wp-static.s3-ap-northeast-1.amazonaws.com/uploads/2019/01/LinkedIn_HP.jpg",
    },
    {
      name: "Facebook",
      photo: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
    },
  ];

  return (
    <div className="profile">
      <Header />
      <div className="biggest-container">
        <div className="profile-left">
          <img
            src="https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />

          <div className="profile-container">
            <div className="avatar-container">
              <img className="avatar" alt="" src={user?.photoURL} />
            </div>
            <div className="profile-info">
              <div className="profile-info-left">
                <h2>{user?.displayName}</h2>
                <h5>Front end developer</h5>
                <p>Istanbul, Turkey</p>
              </div>

              <div className="profile-info-right">
                <div className="company-container">
                  <img
                    className="company-img"
                    alt=""
                    src={companies[0]?.photo}
                  />
                  <h3>{companies[0]?.name}</h3>
                </div>

                <div className="company-container">
                  <img
                    className="company-img"
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/tr/d/d8/Bah%C3%A7e%C5%9Fehir_%C3%9Cniversitesi_logo.png"
                  />

                  <h3>Bahcesehir University</h3>
                </div>
              </div>
            </div>
            <p
              style={{
                color: "#0e76a8",
                fontSize: "13px",
                fontWeight: "600",
                marginTop: "10px",
              }}
            >
              500+ connections
            </p>
            <div className="buttons-container">
              <button
                className="first-button"
                style={{ backgroundColor: "#0e76a8" }}
              >
                Open to work
              </button>
              <button style={{ color: "#0e76a8" }}>
                Add a profile section
              </button>
              <button style={{ borderColor: "gray", color: "gray" }}>
                More{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
