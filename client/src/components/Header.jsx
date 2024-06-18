import { useContext } from "react";
import UserContext from "../context/UserContext"

const Header = () => {
  const { authUser, actions } = useContext(UserContext);

  return (
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a href="index.html">Courses</a></h1>
            <nav>
            {authUser === null ?
                <ul className="header--signedout">
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/signin">Sign In</a></li>
                </ul>
              :
                <ul className="header--signedin">
                    <li>Welcome, {authUser.firstName}!</li>
                    <li><a href="/signout" onClick={actions.signOut}>Sign Out</a></li>
                </ul>
            }
            </nav>
        </div>
    </header>
  )
}

export default Header