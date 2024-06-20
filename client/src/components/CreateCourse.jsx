import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  // Create refs for the form fields
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  // CREATE a new course
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new course object
    const course = {
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: authUser.id
    };
    
    const encodedCredentials = btoa(`${authUser.email}:${authUser.password}`);
    // POST request options
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course),
    }
    // POST request
    try {
      const response = await fetch('http://localhost:5000/api/courses', fetchOptions);
      if (response.status === 201) {
        console.log('course created successfully');
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch(error) {
      console.log('Error:', error);
      // redirect users to the /error path if there's an error creating the course
      navigate('/error');
    }
  }

  // Cancel course creation
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  }

  return (
    <main>
        <div className="wrap">
            <h2>Create Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                        <p>By {authUser ? authUser.firstName : ''} {authUser ? authUser.lastName : ''}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    </main>
  )
}

export default CreateCourse