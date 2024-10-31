import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";
// signInWithRedirect (this import will not work on browsers needs more config see docs)
const firebaseConfig = {
  apiKey: "AIzaSyDguUPpSXxwopkJQ7wq6AI1UFpbjBncoGw",
  authDomain: "estore-db-50070.firebaseapp.com",
  projectId: "estore-db-50070",
  storageBucket: "estore-db-50070.appspot.com",
  messagingSenderId: "390464845683",
  appId: "1:390464845683:web:262a2de90ce1705e22b706"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})


// Google sign in 
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
   

// Get the Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfomation = {}
) => {
  if (!userAuth) return
  
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  // userSnapshot checks and access the data
  const userSnapshot = await getDoc(userDocRef)

  //if user data does not exist
  //create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt =  new Date();
 
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfomation // bypass any null values and assign a value like displayname
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}