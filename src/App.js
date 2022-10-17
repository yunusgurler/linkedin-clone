import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // const navigate = useNavigate();

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
        // navigate("/home");
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <Router>
      <Routes>

        {!user ?
                <Route element={<Login />} path=""></Route>
                :
                <Route element={<Home />} path=""></Route>
              }
        <Route element={<Login />} path="/login"/>
        <Route element={<Home />} path="home"></Route>
        <Route element={<Profile />} path="profile"></Route>
      </Routes>
    </Router>
  );
}

export default App;
