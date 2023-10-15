// import React, { Component } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, {Component, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// add post
import { CssBaseline } from "@mui/material";
import AddTutorial from "./components/AddTu";
import Tutorial from "./components/Tu";
import TutorialsList from "./components/TuList";
import HomePage from "./components/HomePage";
import Blog from "./components/blog/Blog";
import Health from "./components/health/health";
import Career from "./components/career/career";
import Travel from "./components/travel/travel";
import Soul from "./components/soul/soul";
import Beauty from "./components/beauty/beauty";
import Funny from "./components/funny/funny";
import Challenge from "./components/challenge/challenge";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from '@mui/material';
import Header from "./components/blog/Header";
import Box from '@mui/material/Box';
import Footer from "./components/blog/Footer";
import SignIn from "./components/login_out/SignIn";
import {Container} from "@mui/material";
import Upload from "./components/post/MediaUpload";

// login out
import Login from "./components/login_out/Login";
import Register from "./components/login_out/Register";
import Home from "./components/login_out/Home";
import Profile from "./components/profile/Profile";
import BoardUser from "./components/login_out/BoardUser";
import BoardModerator from "./components/login_out/BoardModerator";
import BoardAdmin from "./components/login_out/BoardAdmin";


// Make post
import MakePost from "./components/post/MakePost";
import ViewPost from "./components/post/ViewPost";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";




const sections = [
  // { title: 'Travel', url: '#' , color: '#f6ffb1'},
  { title: 'Khánh An (Health)', url: '/health', color: '#615c62', textcolor: '#f6bfc6' },
  { title: 'Uyên Thư (Career)', url: '/career', color: '#f6bfc6', textcolor: '#000000' },
  { title: 'Du Nhiên (Travel)', url: '/travel', color: '#615c62', textcolor: '#f6bfc6' },
  // { title: 'Health', url: '#' , color: '#f6ffb1'},
  { title: 'Mẫn Nhi (Beauty)', url: '/beauty', color: '#f6bfc6', textcolor: '#000000' },
  { title: 'Tuệ Lâm (Funny)', url: '/funny', color: '#615c62', textcolor: '#f6bfc6' },
  { title: 'Mỹ Tâm (Soul)', url: '/soul', color: '#f6bfc6', textcolor: '#000000' },
  { title: 'Huyền Vi (Challenge)', url: '/challenge', color: '#615c62', textcolor: '#f6bfc6' },
  // { title: 'Style', url: '#' , color: '#f6ffb1'},

];

const theme = createTheme({
  typography: {
    fontFamily: [
      'Lobster',
      'cursive',
    ].join(','),
  },});



  


const App = () => {



  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <div className="container mt-3">
            <CssBaseline />
            <Box sx={{  
              bgcolor: '#cfe8fc',
              backgroundRepeat: "no-repeat",
              position: 'fixed', 
              zIndex: '500',
              top: '0', 
              bottom: '0',
              right: '0', 
              left: '0',
              overflow: 'auto'}}> 
                <Box sx={{
                  height: '100vh', overflow: 'auto', position: 'relative'
                }}>
                   <Box sx={{
                    minHeight: '100vh'
                  }}>

                    <Header title="Her game, her healing" sections={sections} />
                 
                     <Routes>
                        <Route path="/home" element={<HomePage/>} />
                        <Route path="/makepost" element={<MakePost/>} />
                        <Route path="/blog" element={<Blog sections={sections} />} />
                        <Route path="/" element={<TutorialsList/>} />
                        <Route path="/tutorials" element={<TutorialsList/>} />
                        <Route path="/add" element={<AddTutorial/>} />
                        <Route path="/tutorials/:id" element={<Tutorial/>} />
                        <Route path="/health" element={<Health sections = {sections}/>} />
                        <Route path="/beauty" element={<Beauty sections = {sections}/>} />
                        <Route path="/career" element={<Career sections = {sections}/>} />
                        <Route path="/travel" element={<Travel sections = {sections}/>} />
                        <Route path="/funny" element={<Funny sections = {sections}/>} />
                        <Route path="/soul" element={<Soul sections = {sections}/>} />
                        <Route path="/post/:id" element={<ViewPost/>} />
                        <Route path="/challengeeer" element={<Challenge sections = {sections}/>} />

                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/user" element={<BoardUser />} />
                        <Route path="/mod" element={<BoardModerator />} />
                        <Route path="/admin" element={<BoardAdmin />} />
                        <Route path="/home" element={<Home />} />
                      {/* <Route path="/login" element={<Login />} /> */}
                      <Route path="/login" element={<SignIn />} />
                      <Route path="/upload" element={<Upload />} />

                  </Routes>
                    

                  </Box>
                  

                  { currentUser && (
                    <Footer
                      title="Tớ ước mình là nắng để hong khô nỗi buồn"
                      description="Một website được ra để tạo môi trường KẾT nối để người dùng muốn được healing - chữa lành tâm hồn.  Mang đến những cảm giác đơn THUẦN,  thoải mái nhất cho người dùng!"
                      />
                  )}
                </Box>
            </Box>

          </div>
    </Router>
  </ThemeProvider>
  );
}

export default App;