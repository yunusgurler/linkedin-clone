import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Route, Routes, RedirectFunction } from "react-router-dom";
import Home from "./Home";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path=""></Route>
        <Route element={<Home />} path="home"></Route>
        {user ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
