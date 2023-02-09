import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Navbar} from "./components";
import {
  Home,
  FullPost,
  AddPost,
  Login,
  PostTag,
  RegulatoryFramework,
  AddRF,
  Posts,
  About,
} from "./pages";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {isAuth && (
          <>
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add_post" element={<AddPost />} />
            <Route path="/regulatory_framework/:id/edit" element={<AddRF />} />
            <Route path="/add_rf" element={<AddRF />} />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/about" element={<About />} />
        <Route path="/regulatory_framework" element={<RegulatoryFramework />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/tags/:tag" element={<PostTag />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
