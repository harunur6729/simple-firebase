import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../Firebase/firebase.init";
import { useState } from "react";
const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  // console.log(auth)
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleGithubSignin = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser)
    })
    .catch((error) =>{
        console.log("error", error.message);
    })
  }

  const handleSingout = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  return (
    <div>
      {/* user ? logout : sign in */}
      { 
      user ? //jodi user thake tahole sign out button dekhabe r jodi na thake tahole google Login r github login  dekhabe
        <button onClick={handleSingout}>Sing out</button> :
        <>
            <button onClick={handleGoogleSingIn}>Google Login</button>
            <button onClick={handleGithubSignin}>GitHub Login</button>
        </>
      }
      {user && (
        <div>
          <h3>User: {user.displayName}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
