import { useContext, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  // Create refs for the form fields
  const emailAddress = useRef();
  const password = useRef();

  // SIGN IN the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set the default "from" location to the home page
    let from = "/";
    // If the user was redirected to the sign in page, set the "from" location to the previous page
    if (location.state) {
      from = location.state.from;
    }
    // Create a credentials object
    const credentials = {
      username: emailAddress.current.value,
      password: password.current.value,
    };
    // Sign in the user
    try {
      const user = await actions.signIn(credentials);
      if (user) {
        console.log('Sign in successful');
        // Redirect the user to the "from" location
        navigate(from);
      }
    } catch (error) {
      console.error(error);
      // Redirect the user to the /error path if there's an error signing in
      navigate('/error');
    }
  }

  // Cancel sign in
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  }


  return (
    <main>
        <div className="form--centered">
            <h2>Sign In</h2>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            
        </div>
    </main>
  )
}

export default UserSignIn