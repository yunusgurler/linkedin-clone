import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { Avatar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import "./Post.css";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

const Post = forwardRef(
  ({ name, description, message, photoUrl, timestamp, /*postImageUrls*/ postImages }, ref) => {
    let time;
    const [followed, setFollowed] = useState(false);
    console.log(postImages);

    const onFollow = () => {
      setFollowed(!followed);
    };

    const onUnfollow = () => {
      setFollowed(!followed);
    };

    if (timestamp?.seconds) {
      time = new Date(
        timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
      );
    }

    


    return (
      <div ref={ref} className="post">
        <div className="post-header">
          <Avatar src={photoUrl} className="post-avatar">
            {name[0]}
          </Avatar>
          <div className="post-info">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{time?.toDateString()}</p>
          </div>

          {!followed ? (
            <div className="feed-postFollow">
              <AddIcon style={{ color: "#0a66c2" }} />
              <h1
                className="h1"
                onClick={onFollow}
                style={{ color: "#0a66c2" }}
              >
                Follow
              </h1>
            </div>
          ) : (
            <div className="feed-postFollow">
              <DoneIcon style={{ color: "#0a66c2" }} />
              <h1
                className="h1"
                onClick={onUnfollow}
                style={{ color: "#0a66c2" }}
              >
                Unfollow
              </h1>
            </div>
          )}

          {/* {followed? :} */}
        </div>
        <div className="post-body">
          <p>{message}</p>

          {/* {postImageUrls !== undefined &&
            //  <img src={postImageUrls} alt=""/>

            postImageUrls.map(function (postImageUrl) {
              return(     
              <div className="post-image-container">
                <img src={postImageUrl} alt="" />
              </div>);
            })} */}

          {postImages !== undefined &&
            //  <img src={postImageUrls} alt=""/>


            
            postImages.map(function (postImage) {

              


              
              return (
                <div className="post-image-container">
                  <img src={postImage} alt="" />
                </div>
              );
            })}
        </div>

        <div className="post-buttons">
          <div className="post-button">
            <ThumbUpAltOutlinedIcon style={{ color: "gray" }} />
            <p>Like</p>
          </div>
          <div className="post-button">
            <ChatOutlinedIcon style={{ color: "gray" }} />
            <p>Comment</p>
          </div>

          <div className="post-button">
            <ShareOutlinedIcon style={{ color: "gray" }} />
            <p>Share</p>
          </div>

          <div className="post-button">
            <SendOutlinedIcon style={{ color: "gray" }} />
            <p>Send</p>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
