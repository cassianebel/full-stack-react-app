import { createContext, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  // SIGN IN the user
  const signIn = async (credentials) => {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    // GET request options
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };
    // GET request
    const response = await fetch('https://full-stack-react-app-production-13be.up.railway.app/api/users', fetchOptions);
    // If the user is authenticated, set the authenticated user state
    if (response.status === 200) {
      const user = await response.json();
      user.password = credentials.password;
      setAuthUser(user);
      Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error('Sign in failed');
    }
  }

  // SIGN OUT the user - remove the authenticated user state and the cookie
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut,
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;