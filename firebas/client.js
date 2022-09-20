import {
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth"
import { initializeApp } from "firebase/app"
import {
  addDoc,
  getFirestore,
  collection,
  query,
  getDocs,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDootDHQrw4jd5lLv6a-vxsDgxJQfw0wAg",
  authDomain: "devter-d361e.firebaseapp.com",
  projectId: "devter-d361e",
  storageBucket: "devter-d361e.appspot.com",
  messagingSenderId: "857221425183",
  appId: "1:857221425183:web:f3f2b04d7add1b666c0d2a",
  measurementId: "G-RMP07SMKQZ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChangedTo = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const nomalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(nomalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}

export const addDevit = async ({ avatar, content, userId, userName }) => {
  const payload = {
    avatar,
    content,
    userId,
    userName,
    createdAt: new Date(),
    likesCounts: 0,
    sharedCount: 0,
  }
  const collectionRef = collection(db, "devits")

  await addDoc(collectionRef, payload)
}

export const fetchLasteDevits = async () => {
  const q = query(collection(db, "devits"))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data
    console.log(createdAt)

    const date = new Date(createdAt.seconds * 1000)
    const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)
    return {
      ...data,
      id,
      createdAt: normalizedCreatedAt,
    }
  })
}
