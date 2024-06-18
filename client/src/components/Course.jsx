import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';

const Course = () => {
  const [course, setCourse] = useState([]);
  let { id} = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
              <Link className="button" to={"/courses/" + id + "/update"}>Update Course</Link>
              <Link className="button" to="#">Delete Course</Link>
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

export default Course