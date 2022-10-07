import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AddIcon from "@mui/icons-material/Add";

import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import "./Post.css";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
const Post = forwardRef(({ name, description, message, photoUrl, timestamp }, ref) => {
  let time;
  const user = useSelector(selectUser);

  
  if (timestamp?.seconds) {
    time = new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000);
  }

  return (
    <div ref={ref} className="post">
      <div className="post-header">
        <Avatar src={photoUrl} className="post-avatar">{name[0]}</Avatar>
        <div className="post-info">
          <h2>{name}</h2>
          <p>{description}</p>
          <p>{time?.toDateString()}</p>
        </div>

        <div className="feed-postFollow">
          <AddIcon style={{ color: "#0a66c2" }} />
          <h1 style={{ color: "#0a66c2" }}>Follow</h1>
        </div>
      </div>
      <div className="post-body">
        <p>{message}</p>
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
})

export default Post;
