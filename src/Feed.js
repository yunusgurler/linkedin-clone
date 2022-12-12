import React, { useEffect, useState } from "react";
import "./Feed.css";
import PanoramaIcon from "@mui/icons-material/Panorama";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotesIcon from "@mui/icons-material/Notes";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [postImageUrls, setPostImageUrls] = useState([]);
  
  const user = useSelector(selectUser);

  // const onImageChange = (e) => {
  //   setPostImages([...e.target.files])

  // }
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

      if(postImages.length < 1) return;
      const newImageUrls = [];
      postImages.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
      setPostImageUrls(newImageUrls);

    // console.log(postImages);
    console.log(postImageUrls);

  }, [postImages]);



  const sendPost = (e) => {
    e.preventDefault();

    if (input) {
      db.collection("posts").add({
        name: user?.displayName,
        description: user?.email,
        message: input,
        photoUrl: user?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        postImageUrls: postImageUrls

      });
    } else {
      alert("Input can't be empty")
    }

    setInput("");
  };

  

  return (
    <div className="feed">
      {/* input and options */}
      <div className="feed-inputContainer">
        <div className="feed-input">
          {/* <Avatar className="feed-avatar" /> */}
          {user && (
            <Avatar src={user?.photoURL} className="feed-avatar">
              {user?.displayName?.charAt(0)}
            </Avatar>
          )}
          {/* {user.photoURL && <img src={user.photoURL} alt="" className="yunus-top"></img>} */}

          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Post something"
              type="text"
            ></input>

            <SendIcon className="send-icon" onClick={sendPost} />

            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className="feed-postOptions">
          <div className="feed-postOptionIcon">
            <PanoramaIcon style={{ color: "#0dc2ff" }} />
            <div className="send-photo">
            <p>Photo</p>
            {/* <input type="file" multiple accept="image/*" onChange={onImageChange} /> */}
            </div>
          </div>

          <div className="feed-postOptionIcon">
            <SmartDisplayIcon style={{ color: "#00e273" }} />
            <p>Video</p>
          </div>

          <div className="feed-postOptionIcon">
            <CalendarMonthIcon style={{ color: "#ffcc66" }} />
            <p>Calendar</p>
          </div>

          <div className="feed-postOptionIcon">
            <NotesIcon style={{ color: "#cc3300" }} />
            <p>Notes</p>
          </div>
        </div>
      </div>
      {/* sort and hr */}
      <div className="feed-sort">
        <hr></hr>
        <p>Sort options:</p>
        <h5>Newest</h5>
        <ArrowDropDownIcon className="feed-dropIcon" />
      </div>

      {/* posts */}
      <FlipMove>
        {posts.map(
          ({
            id,
            data: { name, description, message, photoUrl, timestamp, /*postImageUrls*/ postImages },
          }) => (
            <Post
              key={id}
              name={name}
              description="User"
              message={message}
              photoUrl={photoUrl}
              timestamp={timestamp}
              // postImageUrls={postImageUrls}
              postImages={postImages}
            />
          )
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
