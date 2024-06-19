import { useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  const emailAddress = useRef();
  const password = useRef();

  // SIGN IN the user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      const user = await actions.signIn(credentials);
      if (user) {
        console.log('Sign in successful');
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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