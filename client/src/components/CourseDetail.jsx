import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';

import UserContext from '../context/UserContext';

const CourseDetail = () => {
  const [course, setCourse] = useState([]);
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  let { id } = useParams()

  // GET the course data
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // DELETE the course
  const handleDelete = async () => {
    const encodedCredentials = btoa(`${authUser.email}:${authUser.password}`);

    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course),
    }

    const response = await fetch(`http://localhost:5000/api/courses/${id}`, fetchOptions);
    if (response.status === 204) {
      console.log('course deleted successfully');
      navigate(`/`);
    } else if (response.status === 400) {
      const data = await response.json();
      console.log(data.errors);
    }

  }

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
            {authUser.id === course.userId &&
              <>
                <Link className="button" to={"/courses/" + id + "/update"}>Update Course</Link>
                <Link className="button" onClick={handleDelete}>Delete Course</Link>
              </>
            }
              <Link className="button button-secondary" to="/">Return to List</Link>
          </div>
      </div>
            
      <div className="wrap">
          <h2>Course Detail</h2>
          <form>
              <div className="main--flex">
                  <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{course.title}</h4>
                      <p>By </p>

                      <Markdown>{course.description}</Markdown>
                  </div>
                  <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{course.estimatedTime}</p>

                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                        <Markdown>{course.materialsNeeded}</Markdown>
                      </ul>
                  </div>
              </div>
          </form>
      </div>
    </main>
  )
}

export default CourseDetail