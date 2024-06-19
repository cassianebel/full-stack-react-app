import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from './components/Header.jsx';
import Courses from './components/Courses.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import UpdateCourse from './components/UpdateCourse.jsx';
import CreateCourse from './components/CreateCourse.jsx';
import UserSignIn from './components/UserSignIn.jsx';
import UserSignUp from './components/UserSignUp.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
      </Routes>
    </>
  );
}

export default App;
