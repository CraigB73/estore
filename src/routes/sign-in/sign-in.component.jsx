import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component.jsx"
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,

} from "../../utils/firebase/firebase.utils"
import { Outlet } from "react-router-dom"
const SignIn = () => {
 

   // The RedirectResult will not work on browers due to cookies   
  //  const response = await getRedirectResult(auth);

      
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    
    return userDocRef;
  }



  return (
    <div>
      <Outlet/>
      <h1>Sign in page</h1>
      <hr/> 
      <div>
        <div>
          <SignUpForm />
        <div>
          <Button buttonType='google' onClick={logGoogleUser}>Sign in with Google Popup</Button>
        </div>
         
        </div>
      </div>
  
    </div>
  )
}

export default SignIn