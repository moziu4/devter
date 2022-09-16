import { GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDootDHQrw4jd5lLv6a-vxsDgxJQfw0wAg",
  authDomain: "devter-d361e.firebaseapp.com",
  projectId: "devter-d361e",
  storageBucket: "devter-d361e.appspot.com",
  messagingSenderId: "857221425183",
  appId: "1:857221425183:web:f3f2b04d7add1b666c0d2a",
  measurementId: "G-RMP07SMKQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);



const mapUserFromFirebaseAuthToUser = (user) => {
    const {displayName, email, photoURL } = user
  
    return {
      avatar: photoURL,
      username: displayName,
      email
    }
  }
  


  export const onAuthStateChangedTo = (onChange) => {
    return onAuthStateChanged (auth, (user =>{
        const nomalizedUser = mapUserFromFirebaseAuthToUser(user)
        onChange(nomalizedUser)
    }))
    
}

  export const loginWithGitHub = () => {
    const githubProvider = new GithubAuthProvider()
    return signInWithPopup(auth, githubProvider)
  }