import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);
  let { id } = useParams()

  // GET the course data
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => {
        console.error('Error:', error)
        // redirect users to the /error path if there's an error fetching the course data
        navigate('/error');
      });
  }, []);

  // Create refs for the form fields
  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();

  // UPDATE the course
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
    // PUT request options
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course),
    }
    // PUT request
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, fetchOptions);
      if (response.status === 204) {
        console.log('course updated successfully');
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch(error) {
      console.log('Error:', error);
      // redirect users to the /error path if there's an error updating the course
      navigate('/error');
    }
  }

  // Cancel course update
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  }

  // redirect users to the /notfound path if the requested course isn't returned from the REST API
  if (!course) {
    navigate('/notfound');
    //redirect users to the /forbidden path if the requested course isn't owned by the authenticated user.
  } else if (authUser && authUser.id !== course.userId) {
    navigate('/forbidden');
  } else {
    // render the course update page
    return (
      <main>
        <div className="wrap">
            <h2>Update Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} ref={courseTitle}/>

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} ref={courseDescription}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} ref={estimatedTime}/>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    </main>
    )
  }
}

export default UpdateCourse