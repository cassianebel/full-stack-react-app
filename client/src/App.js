import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from './components/Header.jsx';
import Courses from './components/Courses.jsx';
import Course from './components/Course.jsx';
import UserSignIn from './components/UserSignIn.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/signin" element={<UserSignIn />} />
      </Routes>
    </>
  );
}

export default App;
