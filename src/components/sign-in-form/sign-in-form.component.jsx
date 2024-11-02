import { useState, useRef, useEffect } from 'react'
import FormInput from '../form-input/form-input.component.jsx';
import Button from '../button/button.component.jsx'
import './sign-in-form.style.scss'
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,

} from "../../utils/firebase/firebase.utils.js"
const defaultFormFields = {
  email: '',
  password: '',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)


  const { email, password } = formFields
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleChange = (event) => {
    /* The {name} is a reference to the formFiled 
     object state inorder to update the state. The {name, value} is provided  */
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
     console.log(response)
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid email and/or password!')
      } else {
        console.log('Error with signing in!', error.message)
      }
    } finally {
       resetFormFields() 
    }
    
  };

  return (
    <div className='sign-in-form-container'>
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
     
      <div>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Email'
            type='email'
            name='email'  
            value={email}
            onChange={handleChange}
            required
          />
          <FormInput
            label='Password'
            type='password'
            name ='password'  
            value={password}
            onChange={handleChange }
            required
          />
          <div className='button-container'>
            <Button type='Submit'>Sign in</Button>
            <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
          </div>
          
        </form>
        
      </div>
      
    </div>
  )
}

export default SignInForm