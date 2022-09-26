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
  orderBy,
  limit
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

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
const storage = getStorage(app)

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

export const addDevit = async ({ avatar, content, img, userId, userName }) => {
  const payload = {
    avatar,
    content,
    img,
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
  const q = query(collection(db, "devits"), orderBy("createdAt", "desc"), limit(20))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data

    return {
      ...data,
      id,
      createdAt: +createdAt.toDate(),
    }
  })
}

export const uploadImage = (file) => {
  const ref1 = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(ref1, file)
  return task
}
